import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../../components/admin.layout";
import Spinner from "../../../../components/spinner";
import UserCard from "../../../../components/user.card";
import Image from "next/image";
// import Link from "next/link";
import { BsBookmarkPlus, BsBookmarkFill } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { RiSettingsLine } from "react-icons/ri";
import { format, formatDistance, formatRelative, subDays } from "date-fns";

// firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { kServicesRef, kSpeakersRef } from "../../../../utils/constants";

// get paths
export async function getStaticPaths() {
  // get all services
  const db = firebase.firestore();
  const res = await db.collection("services").get();

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
  let churchSpeakers = [];
  let currentService;
  if (docs) churchSpeakers = docs.map((item) => item.data());

  if (res.exists) {
    currentService = res.data();
    currentService.speakers = res
      .data()
      .speakers.map((id) => churchSpeakers.find((person) => person.id === id));
  }

  return {
    props: {
      isAdmin: currentUser?.email === "admin@church.com",
      service: currentService,
      speakers: churchSpeakers,
    },
  };
}

function ServiceItemDetails({ isAdmin, service, speakers }) {
  service.dateMonth = format(new Date(service.date), "MMM dd, hh:mm a");

  // router
  const router = useRouter();

  // loading
  const [joining, setJoining] = useState(false);

  // join service state
  const [hasJoinedService, setHasJoinService] = useState(false);

  // bookmark
  const [bookmarked, setBookmarked] = useState(true);

  // current speaker
  const [activeSpeaker, setActiveSpeaker] = useState(null);

  const joinService = async () => {
    if (service.isOngoing) {
      router.push(`/dashboard/service/${service.id}/livestream`);
    }
  };

  useEffect(() => {
    let now = new Date().getTime();
    if (service) service.isOngoing = true;
    //! TODO -> apply ongoing state
    // service.isOngoing = now > service.start_time && now <= service.end_time;
    if (speakers) setActiveSpeaker(speakers[0]);
  }, [speakers]);

  return (
    <Layout>
      {service === null || activeSpeaker === null ? (
        <Spinner isAbsolute />
      ) : (
        <div className="w-full max-w-7xl grid grid-cols-2 xl:grid-cols-3 gap-x-8 h-full">
          {/* speakers */}
          <div className="flex flex-col h-full items-center card pb-4">
            {/* banner & active speaker */}
            <div className="flex flex-col h-56 w-full relative">
              {/* banner */}
              <div className="overflow-hidden bg-primary rounded-tr-2xl rounded-tl-2xl h-full w-full">
                <Image
                  src={service?.banner}
                  height={500}
                  width={800}
                  objectFit="cover"
                />
              </div>

              {/* active speaker */}
              {activeSpeaker && activeSpeaker.avatar && (
                <div className="z-10 rounded-full h-32 w-32 bg-gray-100 border-8 border-white absolute top-3/4 inset-x-0 mx-auto ">
                  <Image
                    src={activeSpeaker.avatar}
                    width={128}
                    height={128}
                    className="object-cover rounded-full"
                  />
                </div>
              )}
            </div>

            {/* actions */}
            <div className="mt-20 flex flex-col items-center mx-auto w-4/5 border-b border-gray-200 pb-4">
              <h6 className="">{activeSpeaker.name}</h6>
              <p className="text-sm text-gray-400 font-serif text-center mb-8">
                {activeSpeaker.bio}
              </p>
              {isAdmin ? (
                <div className="flex flex-row space-x-4 px-10 items-center justify-around">
                  {/* edit */}
                  <div className="action-icon">
                    <FiEdit2 />
                  </div>

                  {/* bookmark */}
                  <div
                    className="action-icon transition-all duration-300"
                    onClick={() => setBookmarked(!bookmarked)}
                  >
                    {bookmarked ? <BsBookmarkFill /> : <BsBookmarkPlus />}
                  </div>

                  {/* settings */}
                  <div className="action-icon">
                    <RiSettingsLine />
                  </div>
                </div>
              ) : joining ? (
                <>
                  <Spinner size={8} />
                </>
              ) : (
                <>
                  {/* join service */}
                  <button
                    onClick={joinService}
                    disabled={!service.isOngoing || service.stream_url === null}
                    className={`${
                      hasJoinedService ? "btn-primary" : "btn-outlined"
                    }
                    "w-2/3 mx-auto"`}
                  >
                    {service.stream_url && (
                      <h6 className="">Watch livestream</h6>
                    )}
                  </button>
                </>
              )}
            </div>

            {/* service details */}
            <h4 className="mt-4 w-4/5 pl-4 mx-auto text-left underline">
              Speakers
            </h4>
            <div className="flex flex-col space-y-4 items-start w-4/5 mx-auto mt-4">
              {service.speakers.map((speaker) => (
                <UserCard
                  onClick={() => setActiveSpeaker(speaker)}
                  key={speaker.id}
                  speaker={speaker}
                />
              ))}
            </div>
          </div>

          {/* service details */}
          <div className="flex xl:col-span-2 h-full w-full flex-col px-8">
            <h6 className="text-indigo-700 font-semibold">
              {service.dateMonth}
            </h6>
            <h1 className="text-3xl 2xl:text-5xl mt-1">{service.title}</h1>
            {/* <div className="mt-2 flex items-center text-sm space-x-2">
              <p className="text-gray-400">Between:</p>

              <p className="text-indigo-700">{service.duration}</p>
            </div> */}
            <p className="text-sm font-light font-serif mt-8">{service.desc}</p>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default ServiceItemDetails;
