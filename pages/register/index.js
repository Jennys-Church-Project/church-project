/*
 * File: index.js                                                              *
 * Project: church-project                                                     *
 * Created Date: Thursday, June 17th 2021, 7:17:47 pm                          *
 * -----                                                                       *
 * Last Modified: Tuesday, June 29th 2021 7:21:50 pm                           *
 */

import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { kAppName } from "../../utils/constants";
import { AiOutlineClose } from "react-icons/ai";
import { toast, ToastContainer } from "react-nextjs-toast";

function RegisterAccount() {
  const [loading, setLoading] = useState(false);
  const [validForm, setValidForm] = useState(false);

  const handleInputChange = (e) => {
    const name = e.target.value;
    // TODO -> perform input validation
  };

  const createMember = async (e) => {
    e.preventDefault();
    if (e.target.password.value !== e.target.password_confirm.value) {
      toast.notify("Passwords do not match", {
        duration: 5,
        type: "error",
      });
      return false;
    }
    // toggle loading indicator
    setLoading(true);

    const res = await fetch("/api/register", {
      body: JSON.stringify({
        first_name: e.target.first_name.value,
        last_name: e.target.last_name.value,
        email: e.target.email.value,
        middle_name: e.target.middle_name.value,
        password: e.target.password.value,
        avatar: '',
        dob: e.target.dob.value,
        address: e.target.address.value,
        position: e.target.position.value,
        contact: e.target.contact.value,
        hometown: e.target.hometown.value,
        nationality: e.target.nationality.value,
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
      toast.notify("Member created successfully", {
        duration: 5,
        type: "success",
      });
      // reset all fields
      e.target.reset();
    } else {
      // toast
      toast.notify("Unable to create account", {
        duration: 5,
        type: "error",
      });
    }
  };

  return (
    <div className="w-screen min-h-screen">
      <Head>
        <title>Register</title>
      </Head>

      <ToastContainer align={"right"} position={"bottom"} />

      <div className="flex justify-center items-center w-full h-screen">
        <div className="flex flex-col lg:grid grid-cols-6 bg-gray-100 items-center overflow-clip h-full lg:h-4/5 lg:rounded-3xl w-full max-w-7xl">
          {/* left */}
          <div className="col-span-2 bg-secondary h-full w-full px-20 py-12 lg:rounded-tl-3xl lg:rounded-bl-3xl">
            <div className="flex flex-col justify-center w-full h-full container mx-auto space-y-6 relative">
              <img
                src="./vercel.svg"
                alt="logo"
                className="h-10 w-20 mb-8 lg:m-0"
              />
              <h4 className="text-3xl text-black">Join our fellowship today</h4>
              <p className="text-sm text-black text-opacity-60">
                {kAppName} offers the pathway to enter into the kingdom of God
                through His son Jesus Christ.
              </p>
            </div>
          </div>

          {/* right */}
          <div className="bg-gray-100 col-span-4 flex items-center justify-center container py-12 lg:py-0">
            <div className="w-2/3 mx-auto flex flex-col">
              <h4 className="text-2xl">Create a new member</h4>
              <p className="text-sm text-black text-opacity-50">
                Fill the form below to add a new member to the fellowship
              </p>

              <form className="mt-12" onSubmit={createMember}>
                {/* name section */}
                <div className="form-row">
                  {/* first name */}
                  <div className="form-control">
                    <label htmlFor="first_name">First Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. John"
                      name="first_name"
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* last name */}
                  <div className="form-control">
                    <label htmlFor="last_name">Last Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Doe"
                      name="last_name"
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* middle name */}
                  <div className="form-control">
                    <label htmlFor="middle_name">Middle Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Alex"
                      name="middle_name"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* email & contact section */}
                <div className="form-row">
                  {/* email address */}
                  <div className="form-control form-row-2">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      placeholder="e.g. john.doe@mail.com"
                      name="email"
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* contact */}
                  <div className="form-control">
                    <label htmlFor="contact">Phone Number</label>
                    <input
                      type="number"
                      placeholder="e.g. 05541234569"
                      name="contact"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* nationality & dob section */}
                <div className="form-row">
                  {/* home town */}
                  <div className="form-control">
                    <label htmlFor="hometown">Hometown</label>
                    <input
                      type="text"
                      placeholder="e.g. Accra Central"
                      name="hometown"
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* dob */}
                  <div className="form-control">
                    <label htmlFor="dob">Date of Birth *</label>
                    <input
                      type="text"
                      placeholder="e.g. 23/08/1993"
                      name="dob"
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* nationality */}
                  <div className="form-control">
                    <label htmlFor="nationality">Nationality</label>
                    <input
                      type="text"
                      placeholder="e.g. Ghanaian"
                      value={"Ghanaian"}
                      name="nationality"
                      onChange={handleInputChange}
                      // disabled
                    />
                  </div>
                </div>

                <div className="form-row">
                  {/* physical address */}
                  <div className="form-control">
                    <label htmlFor="address">Ghana Post Address *</label>
                    <input
                      type="text"
                      placeholder="GA-512-9090"
                      name="address"
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* physical address */}
                  <div className="form-control form-row-2">
                    <label htmlFor="position">Position *</label>
                    <input
                      type="text"
                      placeholder="e.g. Deacon"
                      name="position"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* password section */}
                <div className="form-row">
                  {/* password */}
                  <div className="form-control form-row-1/2">
                    <label htmlFor="password">Password *</label>
                    <input
                      type="password"
                      placeholder="e.g. church1234"
                      name="password"
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* confirm password */}
                  <div className="form-control form-row-1/2">
                    <label htmlFor="password_confirm">Confirm Password *</label>
                    <input
                      type="password"
                      placeholder="e.g. church1234"
                      name="password_confirm"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* submit */}
                <button
                  type="submit"
                  onClick={validForm ? createMember : null}
                  className={`${loading ? "btn-outlined" : "btn-primary"} 
                    w-1/2 float-right mt-4`}
                >
                  <h6 className="">{loading ? "Please wait..." : "Finish"}</h6>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterAccount;
