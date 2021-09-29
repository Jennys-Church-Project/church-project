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
  kPaystackApiKey,
  kWelfareRef,
} from "../../../utils/constants";
import { Menu, Transition } from "@headlessui/react";
import { usePaystackPayment } from "react-paystack";

// firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Spinner from "../../../components/spinner";

function Welfare() {
  const router = useRouter();
  const types = [kPaymentTypeTithe, kPaymentTypeOffering, kPaymentTypeOther];
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentType, setPaymentType] = useState(kPaymentTypeTithe);

  // called when transaction succeeds/fails
  const onSuccess = async (reference) => {
    // reference: "1631863616810";
    // status: "success";
    // trans: "1331033930";
    // transaction: "1331033930";

    if (reference.status === "success") {
      // Implementation for whatever you want to do with reference and after success call.
      console.log(reference);
      save(reference.transaction);
    } else {
      alert("Failed to complete transaction");
    }
  };

  // called when transaction window is closed
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const config = {
    reference: new Date().getTime(),
    email: firebase.auth().currentUser?.email || "",
    amount: parseInt(amount) * 100,
    currency: "GHS",
    publicKey: kPaystackApiKey,
  };

  let initializePayment = usePaystackPayment(config);

  // save to firebase
  const save = async (transactionId) => {
    setLoading(true);
    let uid = "aX14iOU1HxhocLne1VcwOyxj4NE3" || firebase.auth().currentUser.uid;
    await firebase.firestore().collection(kWelfareRef).doc().set({
      user: uid,
      amount,
      paymentType,
      transactionId,
      created_at: new Date().getTime(),
    });
    setLoading(false);
    alert("Payment was successful");
    router.push("/dashboard/service");
  };

  const makePayment = async (e) => {
    e.preventDefault();
    if (amount === "") {
      alert("Enter an amount first");
      return;
    }

    if (confirm(`Proceed with payment of ₵${amount}?`)) {
      initializePayment(onSuccess, onClose);
    }
  };

  // useEffect(() => {

  //   return null;
  // }, []);

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
