/*
 * File: index.js                                                              *
 * Project: church-project                                                     *
 * Created Date: Tuesday, July 6th 2021, 10:30:55 am                           *
 * -----                                                                       *
 * Last Modified: Tuesday, July 6th 2021 10:30:55 am                           *
 */
import Layout from "../../../components/layout";
import {
  kAppName,
  kPaymentTypeOffering,
  kPaymentTypeOther,
  kPaymentTypeTithe,
} from "../../../utils/constants";
import { Menu, Dialog, Transition } from "@headlessui/react";

// firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import Spinner from "../../../components/spinner";

function Welfare() {
  const router = useRouter();
  const types = [kPaymentTypeTithe, kPaymentTypeOffering, kPaymentTypeOther];
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentType, setPaymentType] = useState(kPaymentTypeTithe);

  const makePayment = async (e) => {
    e.preventDefault();
    if (amount === "") {
      alert("Enter an amount first");
      return;
    }
    setLoading(true);
    let uid = firebase.auth().currentUser.uid;
    await firebase.firestore().collection("welfare").doc().set({
      user: uid,
      amount,
      paymentType,
    });
    setLoading(false);
    alert("Payment was successful");
    router.push("/dashboard/service");
  };

  return (
    <Layout>
      <div className="flex flex-col justify-between items-start space-y-8">
        {/* left */}
        <div className="flex flex-col space-y-1">
          {/* title of page */}
          <h2 className="text-3xl">Financial Status</h2>
          <p className="text-sm text-gray-400">
            Make payments for tithes, offerings and others
          </p>
        </div>

        <div
          className="w-full h-full flex flex-col justify-center items-center
      px-8 py-6 bg-white"
        >
          {loading ? (
            <Spinner size={10} />
          ) : (
            <form onSubmit={makePayment} className="flex flex-col items-center">
              <div className="form-control">
                <label htmlFor="amount">Amount (in GHC)</label>
                <input
                  type="number"
                  placeholder="10.00"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="mb-4 mt-0 relative w-full flex flex-col form-control">
                <label htmlFor="payment_type ">Payment for...</label>
                <Menu
                  as="div"
                  id="payment_type"
                  className="relative inline-block text-left"
                >
                  {({ open }) => (
                    <>
                      <div className="">
                        <Menu.Button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-transparent">
                          <div
                            className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-black focus:border-black sm:text-sm"
                            aria-haspopup="listbox"
                            aria-expanded="true"
                            aria-labelledby="listbox-label"
                          >
                            <span className="flex items-center">
                              <span className={`ml-3 block truncate`}>
                                {paymentType || "Tap to select"}
                              </span>
                            </span>
                            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <svg
                                className="h-5 w-5 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          </div>
                        </Menu.Button>
                      </div>

                      {/* dropdown */}
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <div className="py-1">
                            {types.map((item) => (
                              <Menu.Item
                                as="div"
                                key={item}
                                onClick={() => setPaymentType(item)}
                              >
                                <div
                                  className="relative w-full bg-white rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-black focus:border-black sm:text-sm"
                                  aria-haspopup="listbox"
                                  aria-expanded="true"
                                  aria-labelledby="listbox-label"
                                >
                                  <span className="flex items-center">
                                    <span className="ml-3 block truncate">
                                      {item || "Tap to select"}
                                    </span>
                                  </span>
                                </div>
                              </Menu.Item>
                            ))}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>

              {/* submit */}
              <button
                type="submit"
                className={`${loading ? "btn-outlined" : "btn-primary"} 
                    w-full`}
              >
                <h6 className="">
                  {loading ? "Please wait..." : "Proceed to checkout"}
                </h6>
              </button>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Welfare;
