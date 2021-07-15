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
import ServiceCard from "../../../components/service.card";

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
  useEffect(() => {
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
      <div className="w-full h-full flex flex-col">
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
            <div className="grid grid-cols-2 2xl:grid-cols-3 gap-x-6 gap-y-4 h-full w-full mt-4">
              {services.map((service) => (
                <ServiceCard service={service} />
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default Service;
