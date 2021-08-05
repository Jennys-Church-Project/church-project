import AdminLayout from "../../../components/admin.layout";
import Lottie from "lottie-react";
import animationData from "../../../public/empty_status.json";
import { kAppName, kMeetingsRef } from "../../../utils/constants";
import ServiceCard from "../../../components/service.card";
import { useRouter } from "next/router";

// firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// get all meetings
export async function getStaticProps(context) {
  let db = firebase.firestore();
  let meetings = [];

  const snapshot = await db
    .collection(kMeetingsRef)
    .orderBy("date", "asc")
    .get();

  if (snapshot.docs) {
    meetings = snapshot.docs.map((item) => item.data());
  }

  return {
    props: {
      meetings,
    },
  };
}

function Meetings({ meetings }) {
  // empty ui
  const showEmptyUI = !meetings || meetings.length === 0;

  // router
  const router = useRouter();

  return (
    <AdminLayout>
      <div className="flex flex-col space-y-8">
        {/* header */}
        <div className="flex flex-row justify-between items-center">
          {/* left */}
          <div className="flex flex-col space-y-1">
            {/* title of page */}
            <h2 className="text-3xl">Meetings</h2>
            <p className="text-sm text-gray-400">
              All meetings held for {kAppName} will appear here
            </p>
          </div>

          {/* right */}
          <button
            className="btn-outlined"
            onClick={() => router.push("/admin/meetings/new")}
          >
            <h6>Add new</h6>
          </button>
        </div>

        {showEmptyUI ? (
          <>
            <div className="flex flex-col items-center justify-center text-center h-full">
              {/* animation */}
              <Lottie animationData={animationData} />
              <h1 className="text-lg">No meetings available yet</h1>
              <p className="text-black text-opacity-60 text-sm font-serif">
                Meetings will appear here
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 2xl:grid-cols-3 gap-x-6 gap-y-4 h-full w-full mt-4">
              {meetings.map((item) => (
                <div className="flex">
                  <p className="">{item.title}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}

export default Meetings;
