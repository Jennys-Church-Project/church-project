/*
 * File: layout.js                                                             *
 * Project: church-project                                                     *
 * Created Date: Tuesday, July 6th 2021, 10:23:00 am                           *
 * -----                                                                       *
 * Last Modified: Tuesday, July 6th 2021 10:23:01 am                           *
 */

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { kAppName, kUserId, kUserToken } from "../utils/constants";
import { BiSearchAlt, BiBell, BiChurch } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import { GiLifeSupport } from "react-icons/gi";
import { FaMoneyCheck } from "react-icons/fa";
import { FiHelpCircle } from "react-icons/fi";
import { RiHome5Line } from "react-icons/ri";
import DropDown from "./dropdown";

// firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// dashboard content
export const dashboardTabs = [
  {
    name: "Home",
    url: "/admin/home",
    Icon: RiHome5Line,
  },
  {
    name: "Meetings management",
    url: "/admin/meetings",
    Icon: BsPeople,
  },
  {
    name: "Service management",
    url: "/admin/service",
    Icon: BiChurch,
  },
  {
    name: "Counselling",
    url: "/admin/counselling",
    Icon: GiLifeSupport,
  },
  {
    name: "Financial Status",
    url: "/admin/finance",
    Icon: FaMoneyCheck,
  },
  {
    name: "Support",
    url: "/admin/support",
    Icon: FiHelpCircle,
  },
];

function AdminLayout({ children }) {
  // router
  const router = useRouter();

  // load user account details
  useEffect(async () => {
    // get current user instance
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        console.log(`signed in as ${user.email}`);
        localStorage.setItem(kUserId, user.uid);
        localStorage.setItem(kUserToken, await user.getIdToken());
      } else {
        console.log("user signed out");
        router.push("/");
      }
    });
  }, []);

  return (
    <div className="min-h-screen w-screen overflow-hidden bg-gray-100">
      <Head>
        <title>Admin dashboard</title>
      </Head>
      <div className="justify-center items-center min-h-screen">
        {/* sidebar */}
        <div className="z-20 shadow-sm h-full w-3/12 xl:w-1/5 grid grid-rows-sidebar bg-white fixed">
          {/* brand */}
          <div className="flex flex-row items-center justify-center border-b border-gray-300 mx-4">
            {/* app name */}
            <Link href="/admin">
              <div className="text-left cursor-pointer">
                <h6 className="text-xs uppercase lg:text-sm font-bold">
                  {kAppName}
                </h6>
                <h6 className="text-xs uppercase lg:text-sm">Project</h6>
              </div>
            </Link>
          </div>

          {/* options */}
          <div className="flex flex-col space-y-3 px-4 my-4">
            {dashboardTabs.map((option) => {
              const active = router.pathname.startsWith(option.url);

              return (
                <div
                  key={option.url}
                  onClick={() => router.push(option.url)}
                  className={`${
                    active && "bg-gray-200 rounded-md"
                  } flex flex-row space-x-2 cursor-pointer px-4 py-3 items-center`}
                >
                  <option.Icon
                    className={active ? "text-gray-800" : "text-gray-600"}
                  />
                  <h6
                    className={
                      active
                        ? "text-gray-800 text-sm font-medium"
                        : "text-gray-600 text-sm font-medium"
                    }
                  >
                    {option.name}
                  </h6>
                </div>
              );
            })}
          </div>

          {/* footer */}
          <div className="border-t border-gray-300 mx-4 flex flex-col space-y-1 items-start justify-center">
            <h6 className="text-sm font-bold">
              &copy; {kAppName}, {new Date().getFullYear()}
            </h6>
            <p className="text-xs font-light text-gray-400">
              {kAppName} is a church management web application built with a
              good user experience in mind
            </p>
          </div>
        </div>

        {/* content */}
        <div className="min-h-screen h-full w-9/12 xl:w-4/5 float-right flex-1 flex flex-col">
          <div className="bg-white z-10 w-full px-4 py-6 border-b border-gray-200 h-24 fixed top-0 inset-x-0">
            {/* nav bar */}
            <div className="flex items-center justify-end space-x-3 h-full max-w-6xl 2xl:max-w-7xl mx-auto w-full">
              <div className="flex space-x-4 items-center text-gray-500">
                {/* search */}
                <BiSearchAlt
                  className="cursor-pointer text-xl"
                  onClick={() => router.push("/search")}
                />

                {/* notifications */}
                <div
                  className="relative"
                  onClick={() => router.push("/notifications")}
                >
                  <BiBell className="cursor-pointer text-xl" />
                  <div className="rounded-full w-2 h-2 bg-red-400 absolute top-0 right-0"></div>
                </div>
              </div>

              {/* full name */}
              <div className="pl-4 ml-4 border-l border-gray-300">
                <p className="text-xs font-semibold cursor-pointer">
                  Church administrator
                </p>
              </div>

              {/* avatar */}
              <DropDown>
                <div className="avatar"></div>
              </DropDown>
            </div>
          </div>
          {/* body */}
          <div className="bg-gray-100 overflow-x-hidden px-8 xl:px-0 xl:max-w-6xl mx-auto mt-24 flex-1 w-full overflow-auto h-full relative py-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
