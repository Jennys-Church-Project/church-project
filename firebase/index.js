/*
 * File: index.js                                                              *
 * Project: church-project                                                     *
 * Created Date: Thursday, June 24th 2021, 5:46:19 am                          *
 * -----                                                                       *
 * Last Modified: Tuesday, June 29th 2021 1:02:14 pm                           *
 */

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
// import "firebase/analytics";
// import "firebase/performance";
// import "firebase/messaging";
import { faqs, services, speakers } from "../utils/constants";

const clientCredentials = {
  apiKey: "AIzaSyBTjxKJ_mV1ozeehpFm04KR2SN1-C5i2-A",
  authDomain: "church-react-project.firebaseapp.com",
  projectId: "church-react-project",
  storageBucket: "church-react-project.appspot.com",
  messagingSenderId: "635945888316",
  appId: "1:635945888316:web:439b4b02461435aca0f139",
  measurementId: "G-639MJ2FSMG",
};

export default function init() {
  if (!firebase.apps.length) {
    firebase.initializeApp(clientCredentials);

    if (typeof window !== "undefined") {
      // enable analytics
      if ("measurementId" in clientCredentials) {
        // firebase.analytics();
        // firebase.performance();
      }
    }
    // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

    console.log("firebase was successfully initialized");

    // prepopulate database
    const speakersCol = firebase.firestore().collection("speakers");
    const servicesCol = firebase.firestore().collection("services");
    const faqsCol = firebase.firestore().collection("faqs");

    // prepoluate with all speakers
    speakers.forEach(async (item) => {
      await speakersCol.doc(item.id).set(item, { merge: true });
    });

    // prepoluate with all services
    services.forEach(async (item) => {
      await servicesCol.doc(item.id).set(item, { merge: true });
    });

    // prepopulate with all faqs
    faqs.forEach(async (item) => {
      await faqsCol.doc(item.id).set(item, { merge: true });
    });
  }
}
