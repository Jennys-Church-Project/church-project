import Layout from "../../../../components/layout";

// firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { useState } from "react";
import Spinner from "../../../../components/spinner";
import {
  kServicesRef,
  kSpeakersRef,
  kMembersRef,
} from "../../../../utils/constants";

// get paths
export async function getStaticPaths() {
  // get all services
  const db = firebase.firestore();
  const res = await db.collection(kServicesRef).get();

  // construct paths
  const paths = res.docs.map((doc) => {
    return {
      params: {
        id: doc.id,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

// get props
export async function getStaticProps({ params }) {
  // get current user
  const currentUser = firebase.auth().currentUser;
  console.log(`current user -> ${currentUser?.email}`);

  // url
  let { id } = params;

  const db = firebase.firestore();
  const res = await db.doc(`${kServicesRef}/${id}`).get();
  const { docs } = await db.collection(kSpeakersRef).get();
  const membersSnapshot = await db.collection(kMembersRef).get();
  let churchSpeakers = [],
    members = [];
  let currentService;
  if (docs) churchSpeakers = docs.map((item) => item.data());
  if (membersSnapshot.docs)
    members = membersSnapshot.docs.map((item) => item.data());

  if (res.exists) {
    currentService = res.data();
    currentService.attendants = res.data().attendants.map((id) => {
      let users = [];
      let user = members.find((person) => person.id === id);
      let speaker = churchSpeakers.find((person) => person.id === id);
      if (user) users.push(user);
      if (speaker) users.push(speaker);
      console.log(users);
      return users;
    });
    currentService.speakers = res
      .data()
      .speakers.map((id) => churchSpeakers.find((person) => person.id === id));
  }

  return {
    props: {
      // isAdmin: currentUser?.email === "admin@church.com",
      service: currentService,
      speakers: churchSpeakers,
      userId: currentUser?.uid || null,
    },
  };
}

function Livestream({ service, userId }) {
  const [hasJoined, setHasJoined] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // download streamed video
  const downloadVideo = async () => {
    // TODO -> DOWNLOAD VIDEO
    if (
      confirm(
        "Do you wish to start downloading this sermon? (NB: Data charges apply)"
      )
    ) {
      setDownloading(true);
      setTimeout(() => {
        setDownloading(false);
      }, 3500);
    }
  };

  // join livestream
  const joinService = async () => {
    if (!hasJoined) setHasJoined(true);

    if (hasJoined && userId) {
      console.log("joining service");
      service.attendants.push(userId);
      await firebase
        .firestore()
        .doc(`${kServicesRef}/${service.id}`)
        .set(service, { merge: true });
      alert("Joined service successfully");
    }
  };

  return (
    <Layout>
      <div className="w-full h-full flex flex-row space-x-8">
        {/* content */}
        <div className="w-full h-full flex flex-col space-y-8">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col items-start">
              <h6 className="text-sm">Streaming now....</h6>
              <h1 className="text-3xl text-indigo-700">{service.title}</h1>
            </div>

            {/* button */}
            <div className="flex flex-row items-center space-x-4 w-3/5 justify-end">
              {downloading ? (
                <div className="w-12">
                  <Spinner size={8} />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={downloadVideo}
                  className={`btn-primary w-1/3`}
                >
                  <h6 className="">Download</h6>
                </button>
              )}

              <button
                type="button"
                onClick={joinService}
                className={`${
                  !hasJoined ? "btn-outlined" : "btn-primary"
                } w-1/4`}
              >
                <h6 className="">{hasJoined ? "Joined" : "Join now"}</h6>
              </button>
            </div>
          </div>

          {/* stream */}
          <div className="flex-1 mt-8 h-3/4 w-full">
            <iframe
              src={service.stream_url}
              width="100%"
              height={720}
              frameborder="0"
              scrolling="no"
              allow="autoplay"
              allowfullscreen
              webkitallowfullscreen
              mozallowfullscreen
              oallowfullscreen
              msallowfullscreen="true"
            ></iframe>
          </div>
        </div>

        {/* attendants */}
        <div className="h-full bg-red-600 w-40 flex flex-col">
          <div className="flex flex-col items-start">
            {/* <h6 className="text-sm">Attendants</h6> */}
            <h1 className="text-2xl text-indigo-700">Attendants</h1>
            {service.attendants.map((user, index) => (
              <h6 key={index} className="">
                {user.id}
              </h6>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Livestream;
