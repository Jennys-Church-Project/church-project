/*
 * File: layout.js                                                             *
 * Project: church-project                                                     *
 * Created Date: Tuesday, July 6th 2021, 10:23:00 am                           *
 * -----                                                                       *
 * Last Modified: Tuesday, July 6th 2021 10:23:01 am                           *
 */

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { kAppName, kUserId, kUserToken, kUserType } from "../utils/constants";
import { BiSearchAlt, BiBell } from "react-icons/bi";
import { RiDashboardLine } from "react-icons/ri";
import DropDown from "./dropdown";

// firebase
import firebase from "firebase/app";
import "firebase/auth";

// dashboard content
export const dashboardTabs = (isAdmin) =>
  isAdmin
    ? [
        {
          name: "Service",
          url: "/dashboard/service",
        },
        {
          name: "Youth Meetings",
          url: "/dashboard/youth-meetings",
        },
        {
          name: "Leaders Meetings",
          url: "/dashboard/leaders-meetings",
        },
      ]
    : [
        {
          name: "Service",
          url: "/dashboard/service",
        },
        {
          name: "Youth Meetings",
          url: "/dashboard/youth-meetings",
        },
        {
          name: "Leaders Meetings",
          url: "/dashboard/leaders-meetings",
        },
        {
          name: "Counselling",
          url: "/dashboard/counselling",
        },
        {
          name: "Financial Status",
          url: "/dashboard/welfare",
        },
        {
          name: "Account Settings",
          url: "/dashboard/account",
        },
        {
          name: "Support",
          url: "/dashboard/support",
        },
      ];

function Layout({ children }) {
  // router
  const router = useRouter();

  // current page
  const [currentPage, setCurrentPage] = useState(null);

  // tabs
  const [tabs, setTabs] = useState([]);

  // current user
  const [currentUser, setCurrentUser] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    avatar: null,
    email: "",
    dob: "",
    address: "",
    position: "",
    contact: "",
    hometown: "",
    nationality: "",
  });
  // full name
  currentUser.fullName = `${currentUser.first_name} ${currentUser.middle_name} ${currentUser.last_name}`;

  // load user account details
  useEffect(async () => {
    // get current user instance
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        console.log(`signed in as ${user.email}`);
        localStorage.setItem(kUserId, user.uid);
        localStorage.setItem(kUserToken, await user.getIdToken());

        const res = await fetch("/api/member", {
          body: JSON.stringify({
            uid: localStorage.getItem(kUserId),
            isMember: localStorage.getItem(kUserType) === "member",
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
        if (res.status === 200) {
          const member = await res.json();
          setCurrentUser(member);
          localStorage.setItem(kUserType, "member");
          setTabs(dashboardTabs(false));
        } else {
          console.log("no user account found");
          setTabs(dashboardTabs(true));
        }

        // set current page
        setCurrentPage({
          name: tabs[tabs.findIndex((tab) => tab.url === router.pathname)]
            ?.name,
          url: tabs[tabs.findIndex((tab) => tab.url === router.pathname)]?.url,
        });
      } else {
        console.log("user signed out");
        router.push("/");
      }
    });
  }, []);

  return (
    <div className="min-h-screen w-screen overflow-hidden">
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="grid grid-cols-dashboard justify-center bg-gray-50 items-center h-screen">
        {/* sidebar */}
        <div className="z-20 shadow-sm h-full w-full grid grid-rows-sidebar bg-white">
          {/* brand */}
          <div className="flex flex-row items-center justify-center border-b border-gray-300 mx-4">
            {/* app name */}
            <Link href="/dashboard">
              <div className="text-left cursor-pointer">
                <h6 className="text-xs uppercase lg:text-sm font-bold">
                  {kAppName}
                </h6>
                <h6 className="text-xs uppercase lg:text-sm">Church</h6>
              </div>
            </Link>
          </div>

          {/* options */}
          <div className="flex flex-col space-y-3 px-4 my-4">
            {tabs.map((option, index) => {
              const active = router.pathname === currentPage?.url;

              return (
                <div
                  key={index}
                  onClick={() => router.push(option.url)}
                  className="flex flex-row space-x-2 cursor-pointer px-4 py-3 items-center"
                >
                  <RiDashboardLine
                    className={active ? "text-indigo-600" : "text-gray-800"}
                  />
                  <h6
                    className={
                      active
                        ? "text-indigo-600 text-sm font-medium"
                        : "text-gray-800 text-sm font-medium"
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
        <div className="grid grid-rows-dashboard-content h-full w-full">
          {/* nav bar */}
          <div className="flex items-center justify-end space-x-3 px-6 max-w-7xl mx-auto w-full border-b border-gray-200">
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
            {currentUser.first_name && (
              <div className="pl-4 ml-4 border-l border-gray-300">
                <p className="text-xs font-semibold cursor-pointer">
                  {currentUser.fullName}
                </p>
              </div>
            )}

            {/* avatar */}
            {currentUser.avatar ? (
              <>
                <DropDown>
                  <div className="avatar">
                    <Image
                      className="rounded-full"
                      loading="eager"
                      src={currentUser.avatar}
                      height={100}
                      width={100}
                      layout="intrinsic"
                      objectFit="cover"
                      objectPosition="center center"
                      alt={currentUser.fullName}
                    />
                  </div>
                </DropDown>
              </>
            ) : (
              <DropDown>
                <div className="avatar"></div>{" "}
              </DropDown>
            )}
          </div>

          {/* body */}
          <div className="max-w-6xl 2xl:max-w-7xl mx-auto w-full h-full relative px-4 py-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
