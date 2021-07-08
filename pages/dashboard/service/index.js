/*
 * File: index.js                                                              *
 * Project: church-project                                                     *
 * Created Date: Tuesday, July 6th 2021, 10:28:49 am                           *
 * -----                                                                       *
 * Last Modified: Thu Jul 08 2021                                              *
 */

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import Layout from "../../../components/layout";
import Spinner from "../../../components/spinner";
import Lottie from "lottie-react";
import animationData from "../../../public/empty_status.json";

// firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { kAppName } from "../../../utils/constants";

function Service() {
  // router
  const router = useRouter();

  // loading
  const [loading, setLoading] = useState(true);

  // empty ui
  const [showEmptyUI, setShowEmptyUI] = useState(false);

  // services
  const [services, updateServices] = useState([]);

  // initial state
  useEffect(async () => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        let db = firebase.firestore();

        // get speakers
        let { docs } = await db.collection("speakers").get();
        let churchSpeakers = [];
        if (docs) {
          churchSpeakers = docs.map((item) => item.data());
        }

        // get services
        db.collection("services").onSnapshot(
          async (snapshot) => {
            if (snapshot.docs) {
              let data = snapshot.docs.map((item) => item.data());

              // map speakers to actual data
              data = data.map((item) => {
                return {
                  ...item,
                  speakers: item.speakers.map((id) =>
                    churchSpeakers.find((person) => person.id === id)
                  ),
                };
              });
              updateServices(data);
              setLoading(false);
              setShowEmptyUI(data.length === 0);
            }
          },
          (error) => {
            console.error(error);
            setLoading(false);
            setShowEmptyUI(true);
          }
        );
      }
    });
    return null;
  }, []);

  return (
    <Layout>
      <div className="w-full h-full flex flex-col overflow-hidden">
        {/* title */}
        <h2 className="text-xl">Services</h2>
        <p className="text-xs font-serif text-gray-500">
          All ongoing church services will appear here
        </p>

        {/* programmes */}
        {loading ? (
          <Spinner />
        ) : showEmptyUI ? (
          <>
            <div className="flex flex-col items-center justify-center text-center h-full">
              {/* animation */}
              <Lottie animationData={animationData} />
              <h1 className="text-lg">No services available yet</h1>
              <p className="text-black text-opacity-60 text-sm font-serif">
                {kAppName}'s church services will appear here
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-x-6 h-full w-full mt-4">
              {services.map((service, index) => (
                <Link key={index} href={`/dashboard/service/${service.id}`}>
                  <div className="flex flex-col items-end relative border-none outline-none bg-white transition-all duration-300 rounded-xl hover:shadow hover:bg-opacity-60 max-h-104 cursor-pointer">
                    {/* date */}
                    <div className="absolute top-0 left-0 bg-secondary text-black text-center rounded-tl-xl rounded-br-xl px-2 py-1 text-xs font-serif font-medium">
                      {service.date}
                    </div>

                    {/* banner */}
                    <img
                      src={service.banner}
                      alt="image"
                      className="bg-gray-100 outline-none border-none rounded-tl-xl rounded-tr-xl object-cover w-full h-2/5"
                    />

                    {/* info */}
                    <div className="flex flex-col justify-between h-full items-end">
                      <div className="flex flex-col justify-start px-4 py-3 overflow-hidden">
                        <div className="grid grid-cols-5 gap-x-2 mb-2">
                          {/* title */}
                          <h6 className="text-base col-span-3">
                            {service.title}
                          </h6>

                          {/* duration */}
                          <div className="bg-primary text-white rounded p-1 col-span-2 h-6">
                            <p className="text-xs font-serif text-center">
                              {service.duration}
                            </p>
                          </div>
                        </div>

                        {/* description */}
                        <p className="text-xs text-black text-opacity-50 font-serif">
                          {service.desc}
                        </p>

                        {/* separator */}
                        <div className="border-b-2 border-gray-50 mx-2 my-3"></div>

                        {/* speakers */}
                        <p className="text-xs font-medium font-serif text-gray-400 mb-1">
                          Speakers
                        </p>
                        <div className="flex -space-x-3">
                          {service.speakers.map((speaker, key) => {
                            console.log(speaker);
                            return (
                              <img
                                key={key}
                                src={speaker.avatar}
                                alt={speaker.name}
                                className="avatar"
                              />
                            );
                          })}
                        </div>
                      </div>

                      {/* show details */}
                      <div
                        onClick={() =>
                          router.push(`/dashboard/service/${service.id}`)
                        }
                        className="bg-primary cursor-pointer mr-4 mb-4 items-center justify-center rounded-full flex flex-row space-x-1 text-white py-3 px-4"
                      >
                        <h6 className="font-serif text-xs text-center">
                          Learn more
                        </h6>
                        <BsArrowRight />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default Service;
