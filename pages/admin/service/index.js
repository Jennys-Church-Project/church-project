import AdminLayout from "../../../components/admin.layout";
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

function Services({ services }) {
  // empty ui
  const showEmptyUI = !services || services.length === 0;

  // router
  const router = useRouter();

  return (
    <AdminLayout>
      <div className="w-full h-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col">
            {/* title */}
            <h2 className="text-xl">Services</h2>
            <p className="text-xs font-serif text-gray-500">
              All ongoing church services will appear here
            </p>
          </div>

          {/* right */}
          <button
            className="btn-outlined"
            onClick={() => router.push("/admin/service/new")}
          >
            <h6>Add new</h6>
          </button>
        </div>

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
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}

export default Services;
