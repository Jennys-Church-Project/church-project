import { useRouter } from "next/router";
import AdminLayout from "../../../components/admin.layout";
import Spinner from "../../../components/spinner";
import DashboardHeaderCardItem from "../../../components/dashboard.header.card";
import AdminUserCard from "../../../components/admin.user.card";
import { kAppName } from "../../../utils/constants";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";
import { MdSupervisorAccount } from "react-icons/md";
import { useEffect, useState } from "react";

// firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export async function getStaticProps(context) {
  const membersSnapshot = await firebase
    .firestore()
    .collection("members")
    .orderBy("created_at", "desc")
    .get();
  const speakersSnapshot = await firebase
    .firestore()
    .collection("speakers")
    .get();
  let members = [];
  let pastors = [];
  let otherStaff = [];
  if (membersSnapshot.docs) {
    membersSnapshot.docs
      .map((doc) => doc.data())
      .forEach((item) =>
        item.position === "member" || item.position === "Member"
          ? members.push(item)
          : otherStaff.push(item)
      );
  }

  if (speakersSnapshot.docs) {
    speakersSnapshot.docs
      .map((doc) => doc.data())
      .forEach((item) => pastors.push(item));
  }
  return {
    props: {
      members,
      pastors,
      other_staff: otherStaff,
    },
  };
}

// admin dashboard
function AdminHome({ members, pastors, other_staff }) {
  // router
  const router = useRouter();

  const [headerCards, setHeaderCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeHeader, setActiveHeader] = useState(null);

  useEffect(() => {
    const headerCards = [
      {
        title: "All Users",
        subtitle: `${members.length + pastors.length + other_staff.length}`,
        Icon: RiAccountPinCircleLine,
        color: "white",
        background: "black",
      },
      {
        title: "Members",
        subtitle: `${members.length}`,
        Icon: MdSupervisorAccount,
        color: "white",
        background: "green-400",
      },
      {
        title: "Pastors",
        subtitle: `${pastors.length}`,
        Icon: BsFillPersonFill,
        color: "white",
        background: "indigo-400",
      },
      {
        title: "Other staff",
        subtitle: `${other_staff.length}`,
        Icon: HiUserGroup,
        color: "white",
        background: "red-400",
      },
    ];
    setHeaderCards(headerCards);
    setActiveHeader(headerCards[0]);
    setLoading(false);
  }, [members, pastors, other_staff]);

  return (
    <AdminLayout>
      <div className="flex flex-col space-y-8">
        {/* header */}
        <div className="flex flex-row justify-between items-center">
          {/* left */}
          <div className="flex flex-col space-y-1">
            {/* title of page */}
            <h2 className="text-3xl">Home</h2>
            <p className="text-sm text-gray-400">
              All registered members of the {kAppName}
            </p>
          </div>

          {/* right */}
          <button
            className="btn-outlined"
            onClick={() => router.push("/register")}
          >
            <h6>Add new</h6>
          </button>
        </div>

        {/* data cards */}
        <div className="grid md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-4">
          {headerCards.map((card) => (
            <DashboardHeaderCardItem
              title={card.title}
              subtitle={card.subtitle}
              color={card.color}
              background={card.background}
              active={activeHeader === card}
              Icon={card.Icon}
              key={card.title}
              onClick={() => setActiveHeader(card)}
            />
          ))}
        </div>

        {/* content */}
        {loading ? (
          <>
            <Spinner isAbsolute />
          </>
        ) : (
          <>
            <div className="flex flex-col space-y-2">
              {/* title */}
              <h6 className="text-lg text-gray-600">{activeHeader.title}</h6>
              {/* users */}
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
                {activeHeader.Icon === headerCards[0].Icon && (
                  <>
                    {members.map((person) => (
                      <AdminUserCard
                        user={person}
                        key={person.id}
                        color="green-400"
                      />
                    ))}
                    {pastors.map((person) => (
                      <AdminUserCard
                        user={person}
                        key={person.id}
                        color="indigo-400"
                        isSpeaker={true}
                      />
                    ))}
                    {other_staff.map((person) => (
                      <AdminUserCard
                        user={person}
                        key={person.id}
                        color="red-400"
                      />
                    ))}
                  </>
                )}
                {activeHeader.Icon === headerCards[1].Icon &&
                  members.map((person) => (
                    <AdminUserCard
                      user={person}
                      key={person.id}
                      color="black"
                    />
                  ))}
                {activeHeader.Icon === headerCards[2].Icon &&
                  pastors.map((person) => (
                    <AdminUserCard
                      user={person}
                      key={person.id}
                      color="black"
                      isSpeaker={true}
                    />
                  ))}
                {activeHeader.Icon === headerCards[3].Icon &&
                  other_staff.map((person) => (
                    <AdminUserCard
                      user={person}
                      key={person.id}
                      color="black"
                    />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminHome;
