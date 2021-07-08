/*
 * File: reset-password.js                                                     *
 * Project: church-project                                                     *
 * Created Date: Thursday, July 1st 2021, 3:42:11 pm                           *
 * -----                                                                       *
 * Last Modified: Thursday, July 1st 2021 3:42:11 pm                           *
 */

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast, ToastContainer } from "react-nextjs-toast";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

function ResetPassword() {
  // auth state
  const [loading, setLoading] = useState(false);
  const [validForm, setValidForm] = useState(false);

  // router
  const router = useRouter();

  const resetPassword = async (e) => {
    e.preventDefault();
    // toggle loading indicator
    setLoading(true);

    const res = await fetch("/api/reset-password", {
      body: JSON.stringify({
        email: e.target.email.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    // toggle loading indicator
    setLoading(false);

    if (res.status === 200) {
      const response = await res.json();
      console.log(response);
      toast.notify(`Email sent to ${e.target.email.value}`, {
        duration: 5,
        type: "success",
      });
      // reset all fields
      e.target.reset();
    } else {
      // toast
      toast.notify("Unable to sign in", {
        duration: 5,
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen w-screen">
      <Head>
        <title>Reset Password</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer align={"right"} position={"bottom"} />

      <div className="w-full h-screen grid grid-cols-8">
        {/* left */}
        <div className="col-span-2 bg-password-texture bg-cover bg-no-repeat bg-center" />

        {/* right */}
        <div className="col-span-6 bg-gray-100 rounded-tl-3xl rounded-bl-3xl">
          <div className=" grid grid-rows-auth h-full w-full max-w-4xl mx-auto">
            {/* top */}
            <div className="flex flex-row justify-end px-8 items-center w-full">
              {/* sign up */}
              <button
                className="btn-outlined"
                onClick={() => router.push("/login")}
              >
                <h6>Sign In</h6>
              </button>
            </div>

            {/* middle */}
            <div className="grid grid-cols-2 gap-x-8">
              {/* left */}
              <div className="flex flex-col justify-center items-start space-y-4">
                <p className="text-sm">Hey there,</p>
                <h2 className="text-4xl font-bold w-2/3">
                  Recover your lost password
                </h2>
                <h6 className="text-xs w-3/4 text-gray-400">
                  Enter the email associated with the account and we will send
                  an email with instructions on how to reset your password
                </h6>
              </div>
              {/* right */}
              <div className="flex flex-col justify-center items-center">
                <form className="" onSubmit={resetPassword}>
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
                  </div>

                  {/* submit */}
                  <div className="flex flex-col space-y-2">
                    {/* login button */}
                    <button
                      type="submit"
                      onClick={validForm ? resetPassword : null}
                      className={`${
                        loading ? "btn-outlined" : "btn-primary"
                      } w-full`}
                    >
                      <h6 className="">
                        {loading ? "Please wait..." : "Send email"}
                      </h6>
                    </button>
                  </div>
                </form>
              </div>
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

export default ResetPassword;
