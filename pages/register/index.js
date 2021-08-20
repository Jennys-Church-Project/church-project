/*
 * File: index.js                                                              *
 * Project: church-project                                                     *
 * Created Date: Thursday, June 17th 2021, 7:17:47 pm                          *
 * -----                                                                       *
 * Last Modified: Tuesday, June 29th 2021 7:21:50 pm                           *
 */

import Head from "next/head";
import { useState } from "react";
import { kAppName } from "../../utils/constants";
import { toast, ToastContainer } from "react-nextjs-toast";
import DatePicker from "react-datepicker";

function RegisterAccount() {
  const [loading, setLoading] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [address, setAddress] = useState("");
  const [position, setPosition] = useState("");
  const [contact, setContact] = useState("");
  const [hometown, setHomeTown] = useState("");
  const [nationality, setNationality] = useState("Ghanaian");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [timestamp, setTimestamp] = useState(new Date());

  const createMember = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
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
        first_name: firstName,
        last_name: lastName,
        email,
        middle_name: middleName,
        password,
        avatar: "",
        dob: timestamp.getTime(),
        address,
        position,
        contact,
        hometown,
        nationality,
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
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
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
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
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
                      value={middleName}
                      onChange={(e) => setMiddleName(e.target.value)}
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
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
                      value={hometown}
                      onChange={(e) => setHomeTown(e.target.value)}
                    />
                  </div>

                  {/* dob */}
                  <div className="form-control">
                    <label htmlFor="dob">Date of Birth *</label>
                    <DatePicker
                      selected={timestamp}
                      required={true}
                      className="mt-1 focus:ring-black focus:border-black flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                      onChange={(date) => setTimestamp(date)}
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
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
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
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
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
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
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
                      id="password"
                      placeholder="e.g. church1234"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                      id="password_confirm"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* submit */}
                <button
                  type="submit"
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
