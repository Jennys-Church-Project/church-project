import { useRouter } from "next/router";
import AdminLayout from "../../../components/admin.layout";
import Spinner from "../../../components/spinner";
import DashboardHeaderCardItem from "../../../components/dashboard.header.card";
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
import AdminUserCard from "../../../components/admin.user.card";

export async function getStaticProps(context) {
  const { docs } = await firebase
    .firestore()
    .collection("members")
    .orderBy("created_at", "desc")
    .get();
  let members = [];
  if (docs) {
    docs
      .map((doc) => {
        return { ...doc.data(), created_at: Date.now().toLocaleString() };
      })
      .forEach((item) => members.push(item));
  }
  return {
    props: {
      members,
      pastors: [],
      other_staff: [],
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
        title: "Pastors",
        subtitle: `${pastors.length}`,
        Icon: BsFillPersonFill,
        color: "white",
        background: "indigo-400",
      },
      {
        title: "Members",
        subtitle: `${members.length}`,
        Icon: MdSupervisorAccount,
        color: "white",
        background: "green-400",
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
              Shows a curated list of all registered members of the {kAppName}
            </p>
          </div>

          {/* right */}
          <button
            className="btn-primary"
            onClick={() => router.push("/register")}
          >
            <h6>Add a new member</h6>
          </button>
        </div>

        {/* data cards */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-x-6">
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
              <div className="grid grid-cols-4 gap-x-4 gap-y-8">
                {members.map((person) => (
                  <AdminUserCard
                    person={person}
                    key={person.id}
                    onClick={() => alert(person.id)}
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
