/*
 * File: index.js                                                              *
 * Project: church-project                                                     *
 * Created Date: Tuesday, July 6th 2021, 10:29:55 am                           *
 * -----                                                                       *
 * Last Modified: Tuesday, July 6th 2021 10:29:55 am                           *
 */

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../components/layout";
import Spinner from "../../../components/spinner";
import Lottie from 'lottie-react';
import animationData from '../../../public/empty_status.json';

// firebase
import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'
// import { kAppName } from "../../../utils/constants";

function LeadersMeetings() {
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
        // load services
        let db = firebase.firestore();

        db.collection('leaders-meetings').onSnapshot(async (snapshot) => {
          if (snapshot.docs) {
            let data = snapshot.docs.map((item) => item.data());

            updateServices(data);
            console.log(data);
            setLoading(false);
            setShowEmptyUI(data.length === 0);
          }
        }, (error) => {
          console.error(error.message);
          setLoading(false);
          setShowEmptyUI(true);
        });
      }
    });
    return null;
  }, []);

  return (
    <Layout>
      <div className="w-full h-full flex flex-col">
        {/* title */}
        <h2 className="text-xl">Leaders' Meetings</h2>

        {/* programmes */}
        {loading ? <Spinner /> : showEmptyUI ? <>
          <div className="flex flex-col items-center justify-center text-center h-full">
            {/* animation */}
            <Lottie animationData={animationData} />
            <h1 className="text-lg">No leaders meetings this week</h1>
            <p className="text-black text-opacity-60 text-sm font-serif">You will be notified once meetings are available</p>
          </div>
        </> : <>
          <div className="grid grid-cols-4 h-full w-full bg-gray-100">
            {services.map((service, index) => (
              <div key={index} className="px-4 py-5 bg-white rounded-xl shadow-md h-64 cursor-pointer"></div>
            ))}
          </div>
        </>}
      </div>
    </Layout>
  );
}

export default LeadersMeetings;
