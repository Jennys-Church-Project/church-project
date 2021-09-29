import Spinner from "./spinner";
import { useEffect, useState, Fragment } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { AiOutlineUserDelete, AiOutlineUserSwitch } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { BiCheckDouble } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { format, formatDistance, formatRelative, subDays } from "date-fns";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { kMembersRef } from "../utils/constants";
import { useRouter } from "next/router";

function UserFinanceListItem({ user, createdAt, amount }) {
  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  // router
  const router = useRouter();

  // close modal
  const closeModal = () => {
    setIsOpen(false);
  };

  // open modal
  const openModal = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const getUser = async (id) => {
      var userSnapshot = await firebase
        .firestore()
        .collection(kMembersRef)
        .doc(id)
        .get();
      if (userSnapshot.exists) {
        var userData = userSnapshot.data();
        userData.full_name = userData.first_name + " " + userData.last_name;
        setUserInfo(userData);
      }
    };
    getUser(user);
    return null;
  }, [user]);

  return (
    <div className="w-full cursor-pointer rounded-lg bg-white px-2 py-1">
      {userInfo && userInfo.id && (
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center text-sm">
            <div
              className={`border-gray-400 relative flex items-center justify-center rounded-full w-12 h-12 border-2`}
            >
              {userInfo.avatar ? (
                <Image
                  src={userInfo.avatar}
                  className="rounded-full"
                  width={40}
                  height={40}
                  objectFit="cover"
                />
              ) : (
                <FaRegUserCircle className="h-8 w-8 text-gray-400" />
              )}
            </div>

            <div
              className={`${
                userInfo.avatar && "ml-2"
              } flex flex-col justify-center`}
            >
              <h6 className={`text-black`}>{userInfo.full_name}</h6>
              <p className={`text-gray-600 text-xs xl:text-sm`}>
                {format(new Date(createdAt), "MMM dd, hh:mm a")}
              </p>
            </div>
          </div>

          <h6 className="">₵{amount}</h6>
        </div>
      )}
    </div>
  );
}

export default UserFinanceListItem;
