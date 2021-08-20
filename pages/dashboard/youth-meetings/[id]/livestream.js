import Layout from "../../../../components/layout";

// firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { useState } from "react";
import Spinner from "../../../../components/spinner";
import { kMeetingsRef } from "../../../../utils/constants";
import { useRouter } from "next/router";

// get paths
export async function getStaticPaths() {
  // get all meetings
  const db = firebase.firestore();
  const res = await db.collection(kMeetingsRef).get();

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
  const res = await db.doc(`${kMeetingsRef}/${id}`).get();

  let meeting;
  if (res.exists) meeting = res.data();

  return {
    props: {
      // isAdmin: currentUser?.email === "admin@church.com",
      meeting,
      userId: currentUser?.uid || null,
    },
  };
}

function Livestream({ meeting, userId }) {
  const [hasJoined, setHasJoined] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // router
  const router = useRouter();

  // download streamed video
  const downloadVideo = async () => {
    // TODO -> DOWNLOAD VIDEO
    if (
      confirm(
        "Do you wish to start downloading this recording? (NB: Data charges apply)"
      )
    ) {
      setDownloading(true);
      await router.push(meeting.download_url);
      //   setTimeout(() => {
      //     setDownloading(false);
      //   }, 3500);
    }
  };

  // join livestream
  const joinMeeting = async () => {
    if (!hasJoined) setHasJoined(true);

    if (hasJoined && userId) {
      console.log("joining meeting");
      meeting.attendants.push(userId);
      await firebase
        .firestore()
        .doc(`${kMeetingsRef}/${meeting.id}`)
        .set(meeting, { merge: true });
      alert("Joined meeting successfully");
    }
  };

  return (
    <Layout>
      <div className="w-full h-full flex flex-col space-y-8">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col items-start">
            <h6 className="text-sm">Streaming now....</h6>
            <h1 className="text-3xl text-indigo-700">{meeting.title}</h1>
          </div>

          {/* button */}
          <div className="flex flex-row items-center space-x-4 w-1/2 justify-end">
            {downloading ? (
              <div className="w-12">
                <Spinner size={8} />
              </div>
            ) : (
              meeting.download_url && (
                <button
                  type="button"
                  onClick={downloadVideo}
                  className={`btn-primary w-1/2`}
                >
                  <h6 className="">Download meeting</h6>
                </button>
              )
            )}

            <button
              type="button"
              onClick={joinMeeting}
              className={`${!hasJoined ? "btn-outlined" : "btn-primary"} w-1/4`}
            >
              <h6 className="">{hasJoined ? "Joined" : "Join now"}</h6>
            </button>
          </div>
        </div>

        {/* stream */}
        <div className="flex-1 mt-8 h-3/4 w-full">
          <iframe
            src={meeting.stream_url}
            width="100%"
            height={720}
            frameborder="0"
            scrolling="no"
            allow="autoplay"
            allowfullscreen
            webkitallowfullscreen
            mozallowfullscreen="true"
            oallowfullscreen="true"
            msallowfullscreen="true"
          ></iframe>
        </div>
      </div>
    </Layout>
  );
}

export default Livestream;
