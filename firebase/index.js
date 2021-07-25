import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const clientCredentials = {
  apiKey: "AIzaSyByqUiTqx8Mc3a8rZXlw3ie6x6DZLmGdAI",
  authDomain: "pentecostal-church-project.firebaseapp.com",
  projectId: "pentecostal-church-project",
  storageBucket: "pentecostal-church-project.appspot.com",
  messagingSenderId: "774722864729",
  appId: "1:774722864729:web:470da6db95a13969345348",
  measurementId: "G-XZ0M0SJ668",
};

export default function init() {
  if (!firebase.apps.length) {
    firebase.initializeApp(clientCredentials);
    console.log("firebase was successfully initialized");
  }
}

// prepopulate database
// const speakersCol = firebase.firestore().collection("speakers");
// const servicesCol = firebase.firestore().collection("services");
// const faqsCol = firebase.firestore().collection("faqs");

// prepoluate with all speakers
// speakers.forEach(async (item) => {
//   await speakersCol.doc(item.id).set(item, { merge: true });
// });

// prepoluate with all services
// services.forEach(async (item) => {
//   await servicesCol.doc(item.id).set(item, { merge: true });
// });

// prepopulate with all faqs
// faqs.forEach(async (item) => {
//   await faqsCol.doc(item.id).set(item, { merge: true });
// });
