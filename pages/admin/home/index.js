import { useRouter } from "next/router";
import AdminLayout from "../../../components/admin.layout";
import UserCard from "../../../components/user.card";
import DashboardHeaderCardItem from "../../../components/dashboard.header.card";
import { kAppName } from "../../../utils/constants";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";
import { MdSupervisorAccount } from "react-icons/md";
import { useState } from "react";
import Image from "next/image";

// firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { GiPerspectiveDiceOne } from "react-icons/gi";

export const headerCards = [
  {
    title: "Users onsite",
    subtitle: "456",
    Icon: RiAccountPinCircleLine,
    color: "white",
    background: "black",
  },
  {
    title: "Pastors",
    subtitle: "26",
    Icon: BsFillPersonFill,
    color: "white",
    background: "indigo-400",
  },
  {
    title: "Members",
    subtitle: "123",
    Icon: MdSupervisorAccount,
    color: "white",
    background: "green-400",
  },
  {
    title: "Other staff",
    subtitle: "98",
    Icon: HiUserGroup,
    color: "white",
    background: "red-400",
  },
];

export async function getStaticProps(context) {
  const { docs } = await firebase.firestore().collection("members").get();
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

  const [activeHeader, setActiveHeader] = useState(headerCards[0]);

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
        <div className="flex flex-col space-y-2">
          {/* title */}
          <h6 className="text-sm text-gray-400">{activeHeader.title}</h6>
          {/* users */}
          <div className="grid grid-cols-5">
            {members.map((person) => (
              <div
                key={person.id}
                onClick={() => alert(person.id)}
                className="w-full overflow-hidden bg-white h-32 rounded-xl flex flex-col"
              >
                <div className="flex space-x-2">
                  {/* avatar */}
                  <div className="w-16 h-16 bg-gray-100 rounded-br-lg overflow-hidden">
                    {person.avatar && (
                      <Image
                        src={person.avatar}
                        width={64}
                        height={64}
                        objectFit="cover"
                      />
                    )}
                  </div>
                  {/* full name */}
                  <div className="flex flex-col pt-2 flex-1">
                    <h6 className="text-sm">
                      {person.first_name} {person.last_name}
                    </h6>
                    <p className="text-xs text-gray-600 font-serif">
                      {person.email}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminHome;
