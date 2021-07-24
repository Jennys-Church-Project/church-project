/*
 * File: header.js                                                             *
 * Project: church-project                                                     *
 * Created Date: Thursday, June 3rd 2021, 10:59:59 am                          *
 * -----                                                                       *
 * Last Modified: Tuesday, June 22nd 2021 10:20:33 am                          *
 */

import Link from "next/link";
import { useRouter } from "next/router";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { kAppName } from "../utils/constants";

// header component
function Header() {
  // router instance
  const router = useRouter();

  return (
    <div className="w-screen fixed top-0 inset-x-0 bg-secondary z-10">
      <div className="flex justify-between items-center w-full px-8 py-4 xl:max-w-7xl xl:mx-auto">
        {/* logo */}
        <Link href="/">
          <div className="text-left cursor-pointer">
            <h6 className="text-xs uppercase lg:text-sm font-bold">
              {kAppName}
            </h6>
            <h6 className="text-xs uppercase lg:text-sm ">Project</h6>
          </div>
        </Link>

        <div className="flex flex-row w-full space-x-2 justify-end items-center">
          <button
            type="button"
            className="btn-outlined w-1/6"
            onClick={() => router.push("/register")}
          >
            <h6 className="">Join Now</h6>
          </button>

          <button
            type="button"
            className="btn-primary w-1/6"
            onClick={() => router.push("/login")}
          >
            <h6 className="">Sign in</h6>
          </button>
        </div>

        {/* nav mobile */}
        <div
          className="cursor-pointer inline-block lg:hidden"
          onClick={() => console.log("menu clicked")}
        >
          <HiOutlineMenuAlt4 className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

export default Header;
