/*
 * File: [id].js                                                               *
 * Project: church-project                                                     *
 * Created Date: Th Jul yyyy                                                   *
 * Author: <<author>                                                           *
 * -----                                                                       *
 * Last Modified: Thu Jul 08 2021                                              *
 * Modified By: Windows 11 User                                                *
 * -----                                                                       *
 * Copyright (c) 2021 Windows 11 User                                          *
 */

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../components/layout";
import Spinner from "../../../components/spinner";

// firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { services, speakers } from "../../../utils/constants";

// tabs
export const tabs = ["Overview", "Speakers", "Attendants", "Media"];

function ServiceItemDetails() {
  // router
  const router = useRouter();

  // get id
  const { id } = router.query;

  // loading
  // const [loading, setLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  // service
  // const [service, setService] = useState(null);

  // tabs
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // speakers
  // const [speakers, setSpeakers] = useState([]);

  // useEffect(async () => {
  //   setLoading(true);
  //   const db = firebase.firestore();
  //   const res = await db.doc(`services/${id}`).get();
  //   const { docs } = await db.collection(`speakers`).get();
  //   let churchSpeakers = [];
  //   if (docs) {
  //     churchSpeakers = docs.map((item) => item.data());
  //   }
  //   if (res.exists) {
  //     let currentService = res.data();
  //     currentService.speakers = res
  //       .data()
  //       .speakers.map((id) =>
  //         churchSpeakers.find((person) => person.id === id)
  //       );

  //     // update UI
  //     setService(currentService);
  //     setSpeakers(currentService.speakers);
  //   }

  //   setLoading(service !== null);
  //   return null;
  // }, []);

  return (
    <Layout>
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="w-full max-w-7xl grid grid-cols-3 gap-x-8 h-full">
            {/* speakers */}
            <div className="grid grid-rows-6 gap-y-4">
              <div className="flex row-span-4 card"></div>
              <div className="flex row-span-2 card"></div>
            </div>

            {/* service details */}
            <div className="flex col-span-2 h-full w-full space-y-4 flex-col">
              {/* tabs container */}
              <div className="flex w-4/5 py-1 px-2 rounded-2xl flex-row mx-auto bg-gray-100 text-gray-400 items-center justify-between">
                {tabs.map((tab, index) => {
                  return (
                    <div
                      className={
                        (activeTab === tab && "bg-white text-black") +
                        " rounded-2xl cursor-pointer px-8 transition-all duration-300 py-2 text-center"
                      }
                      key={index}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </div>
                  );
                })}
              </div>

              {/* content */}
              <div className="card">
                <div className="flex flex-col relative h-full w-full">
                  {/* lead speaker */}
                  <img
                    src={speakers[1].avatar}
                    alt={speakers[1].name}
                    className="rounded-full w-32 h-32 absolute top-1/4 left-0 right-0 mx-auto border-4 border-white bg-gray-50 z-10 object-cover"
                  />

                  {/* banner */}
                  <img
                    src={services[0]?.banner}
                    alt={services[0]?.title}
                    className="h-1/3 w-full rounded-tr-2xl rounded-tl-2xl object-cover"
                  />

                  {/* title & description */}
                  <div className="flex flex-col space-y-2 px-6 py-4 mt-16">
                    <h4 className="text-2xl lg:text-3xl">
                      {services[0]?.title}
                    </h4>
                    <p className="font-serif">{services[0]?.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}

export default ServiceItemDetails;
