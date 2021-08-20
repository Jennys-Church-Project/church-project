/*
 * File: index.js                                                              *
 * Project: church-project                                                     *
 * Created Date: Tuesday, July 6th 2021, 10:28:49 am                           *
 * -----                                                                       *
 * Last Modified: Thu Jul 08 2021                                              *
 */

import Layout from "../../../components/layout";
import Lottie from "lottie-react";
import animationData from "../../../public/empty_status.json";
import { kAppName, kServicesRef, kSpeakersRef } from "../../../utils/constants";
import ServiceCard from "../../../components/service.card";

// firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { useRouter } from "next/router";

// get services
export async function getStaticProps(context) {
  let churchSpeakers = [];
  let services = [];
  let db = firebase.firestore();

  // get speakers
  let { docs } = await db.collection(kSpeakersRef).get();

  if (docs) churchSpeakers = docs.map((item) => item.data());

  // get services
  const snapshot = await db
    .collection(kServicesRef)
    .orderBy("date", "asc")
    .get();
  if (snapshot.docs) {
    let data = snapshot.docs.map((item) => item.data());

    // map speakers to actual data
    services = data.map((item) => {
      return {
        ...item,
        speakers: item.speakers.map((id) =>
          churchSpeakers.find((person) => person.id === id)
        ),
      };
    });
  }

  return {
    props: {
      services,
    },
  };
}

function Service({ services }) {
  // empty ui
  const showEmptyUI = !services || services.length === 0;

  const router = useRouter();

  return (
    <Layout>
      <div className="w-full h-full flex flex-col">
        {/* title */}
        <h2 className="text-xl">Services</h2>
        <p className="text-xs font-serif text-gray-500">
          All ongoing church services will appear here
        </p>

        {/* programmes */}
        {showEmptyUI ? (
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
            <div className="grid grid-cols-2 2xl:grid-cols-3 gap-x-6 gap-y-4 h-full w-full mt-4">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onClick={() =>
                    router.push(`/dashboard/service/${service.id}`)
                  }
                />
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default Service;
