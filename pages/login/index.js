/*
 * File: index.js                                                              *
 * Project: church-project                                                     *
 * Created Date: Monday, June 28th 2021, 2:20:49 pm                            *
 * -----                                                                       *
 * Last Modified: Monday, June 28th 2021 3:54:23 pm                            *
 */

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-nextjs-toast";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { BiLeftArrow } from "react-icons/bi";
import { MdSupervisorAccount } from "react-icons/md";

// firebase
import firebase from "firebase/app";
import "firebase/auth";
import { kUserType } from "../../utils/constants";

export const accountTypes = [
  {
    name: "Administrator",
    desc: "Gain full access over the system",
    Icon: RiAdminLine,
  },
  {
    name: "Member",
    desc: "View all programmes, announcements & personal information",
    Icon: MdSupervisorAccount,
  },
];

function LoginPage() {
  // auth state
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  // router
  const router = useRouter();

  const login = async (e) => {
    e.preventDefault();
    // toggle loading indicator
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const { user } = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      // toggle loading indicator
      setLoading(false);

      if (!user) {
        // toast
        toast.notify("Unable to sign in", {
          duration: 5,
          type: "error",
        });
      } else {
        // reset all fields
        e.target.reset();
      }
    } catch (error) {
      setLoading(false);
      toast.notify("Account not found for this email address", {
        duration: 5,
        type: "error",
      });
    }
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user);
        localStorage.setItem(kUserType, userType || "member");
        router.push(userType === "member" ? "/dashboard" : "/admin");
      }
    });
    return null;
  }, []);

  return (
    <div className="min-h-screen w-screen">
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer align={"right"} position={"bottom"} />

      <div className="w-full h-screen grid grid-cols-8">
        {/* left */}
        <div className="col-span-2 bg-login-pattern bg-cover bg-no-repeat bg-center" />

        {/* right */}
        <div className="col-span-6 bg-gray-100 rounded-tl-3xl rounded-bl-3xl">
          <div className=" grid grid-rows-auth h-full w-full max-w-4xl mx-auto">
            {/* top */}
            <div className="flex flex-row justify-between px-8 items-center w-full">
              {showLogin && (
                <div
                  className="flex flex-row items-center space-x-2 cursor-pointer"
                  onClick={() => setShowLogin(!showLogin)}
                >
                  <BiLeftArrow />
                  <h6>Choose account type</h6>
                </div>
              )}
              {/* sign up */}
              <button
                className="btn-outlined"
                onClick={() => router.push("/register")}
              >
                <h6>Sign Up</h6>
              </button>
            </div>

            {/* middle */}
            <div className="grid grid-cols-2 gap-x-8">
              {/* left */}
              <div className="flex flex-col justify-center items-start space-y-4">
                <p className="text-sm">Welcome back</p>
                <h2 className="text-4xl font-bold w-2/3">
                  Login to your personal space
                </h2>
                <h6 className="text-xs w-3/4 text-gray-400">
                  This will grant you access to all services, meetings &amp;
                  information publicly disseminated on this platform
                </h6>
              </div>

              {/* right */}
              {showLogin ? (
                <>
                  <div className="flex flex-col justify-center items-center">
                    <form className="" onSubmit={login}>
                      <div className="form-col">
                        {/* username */}
                        <div className="form-control">
                          <label htmlFor="email">Email Address *</label>
                          <input
                            type="email"
                            placeholder="e.g. john.doe@mail.com"
                            name="email"
                            required
                          />
                        </div>

                        {/* password */}
                        <div className="form-control">
                          <label htmlFor="password">Password *</label>
                          <input
                            type="password"
                            placeholder="e.g. church1234"
                            name="password"
                            required
                          />
                        </div>
                      </div>

                      {/* submit */}
                      <div className="flex flex-col space-y-2">
                        {/* login button */}
                        <button
                          type="submit"
                          className={`${
                            loading ? "btn-outlined" : "btn-primary"
                          } w-full`}
                        >
                          <h6 className="">
                            {loading ? "Please wait..." : "Sign In"}
                          </h6>
                        </button>

                        {/* forgot password */}
                        <Link href="/reset-password">
                          <div className="text-center text-primary font-medium cursor-pointer py-3">
                            Forgot password?
                          </div>
                        </Link>
                      </div>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full w-full max-w-lg mx-auto">
                  <h2 className="text-2xl">Choose your account type</h2>
                  <p className="font-serif mt-2 text-black text-opacity-50 text-center mb-12">
                    Select your account type to get started. This will enable us
                    to tailor your experience based on the selected account
                  </p>

                  {/* account types */}
                  <div
                    className={`grid grid-rows-${accountTypes.length} gap-y-4 w-full mx-auto max-w-sm`}
                  >
                    {accountTypes.map((account, index) => (
                      <div
                        onClick={() => setUserType(account.name.toLowerCase())}
                        className={
                          (userType === account.name.toLowerCase()
                            ? "bg-opacity-10 bg-black border-2 border-black"
                            : "bg-gray-50 border-2 border-gray-100") +
                          ` flex flex-row px-4 py-4 w-full rounded-lg cursor-pointer`
                        }
                        key={index}
                      >
                        <div className="flex flex-row space-x-8">
                          {/* icon */}
                          <div
                            className={
                              (userType === account.name.toLowerCase()
                                ? "rounded-lg bg-black border-2 border-black"
                                : "rounded-lg bg-gray-50 border-2 border-gray-100") +
                              "py-px px-3 flex items-center justify-center"
                            }
                          >
                            <account.Icon
                              className={
                                userType === account.name.toLowerCase()
                                  ? "text-white"
                                  : "text-gray-400"
                              }
                            />
                          </div>

                          {/* title & subhead */}
                          <div className="flex flex-col space-y-1">
                            <h6 className="text-sm font-semibold">
                              {account.name}
                            </h6>
                            <p className="text-xs text-dark text-opacity-50">
                              {account.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* next */}
                  <button
                    type="submit"
                    onClick={() => setShowLogin(!showLogin)}
                    disabled={!userType}
                    className={`${
                      !userType ? "btn-outlined" : "btn-primary"
                    } w-2/3 mt-12`}
                  >
                    <h6 className="">Next</h6>
                  </button>
                </div>
              )}
            </div>

            {/* footer */}
            <div className="grid grid-cols-2 gap-x-8 w-full border-t border-gray-300">
              {/* left */}
              <div className="flex items-center justify-end">
                <h6 className="font-medium text-sm">Our social networks</h6>
              </div>

              {/* right */}
              <div className="flex space-x-4 items-center justify-start">
                {/* facebook */}
                <Link href="https://www.facebook.com/">
                  <div className="cursor-pointer text-white flex items-center justify-center rounded-full p-2 w-10 h-10 bg-gray-800">
                    <FaFacebookF />
                  </div>
                </Link>

                {/* instagram */}
                <Link href="https://www.instagram.com/">
                  <div className="cursor-pointer text-white flex items-center justify-center rounded-full p-2 w-10 h-10 bg-gray-800">
                    <FaInstagram />
                  </div>
                </Link>

                {/* twitter */}
                <Link href="https://twitter.com/">
                  <div className="cursor-pointer text-white flex items-center justify-center rounded-full p-2 w-10 h-10 bg-gray-800">
                    <FaTwitter />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
