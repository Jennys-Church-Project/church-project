/*
 * File: index.js                                                              *
 * Project: church-project                                                     *
 * Created Date: Tuesday, July 6th 2021, 10:29:25 am                           *
 * -----                                                                       *
 * Last Modified: Tuesday, July 6th 2021 10:29:25 am                           *
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
import { kAppName } from "../../../utils/constants";

function YouthMeetings() {
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

        db.collection('youth-meetings').onSnapshot(async (snapshot) => {
          if (snapshot.docs) {
            let services = snapshot.docs.map((item) => item.data());
            updateServices(services);
            setLoading(false);
            setShowEmptyUI(services.length === 0);
          }
        }, (error) => {
          console.error(error);
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
            <h2 className="text-xl">Youth Meetings</h2>
    
            {/* programmes */}
            {loading ? <Spinner /> : showEmptyUI ? <>
              <div className="flex flex-col items-center justify-center text-center h-full">
                {/* animation */}
                <Lottie animationData={animationData} />
                <h1 className="text-lg">No youth meetings this week</h1>
                <p className="text-black text-opacity-60 text-sm font-serif">You will be notified once meetings are available</p>
              </div>
            </> : <>
              <div className="grid grid-cols-4 h-full w-full bg-gray-100"></div>
            </>}
          </div>
        </Layout>
      );
}

export default YouthMeetings
