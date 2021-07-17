import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../components/layout";
import Spinner from "../../../components/spinner";
import Image from "next/image";
import Link from "next/link";
import { BsBookmarkPlus, BsBookmarkFill } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { RiSettingsLine } from "react-icons/ri";

// firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import UserCard from "../../../components/user.card";

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
  const res = await db.doc(`services/${id}`).get();
  const { docs } = await db.collection(`speakers`).get();
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
  // router
  const router = useRouter();

  // get id
  const { id } = router.query;

  // loading
  const [joining, setJoining] = useState(false);

  // join service state
  const [hasJoinedService, setHasJoinService] = useState(false);

  // bookmark
  const [bookmarked, setBookmarked] = useState(true);

  const joinService = async () => {
    // todo -> join service
    setJoining(true);
    setTimeout(
      () => {
        setHasJoinService(!hasJoinedService);
        setJoining(false);
      },
      hasJoinedService ? 1200 : 350
    );
  };

  return (
    <Layout>
      <div className="w-full max-w-7xl grid grid-cols-3 gap-x-8 h-full">
        {/* speakers */}
        <div className="flex flex-col items-center card">
          {/* banner & active speaker */}
          <div className="flex flex-col h-1/3 w-full bg-primary rounded-tr-2xl rounded-tl-2xl relative">
            {/* banner */}
            <Image
              src={service?.banner}
              layout="fill"
              className="object-cover rounded-tr-2xl rounded-tl-2xl"
            />

            {/* active speaker */}
            <div className="rounded-full h-32 w-32 bg-gray-100 border-8 border-white absolute top-3/4 inset-x-0 mx-auto ">
              <Image
                src={speakers[0].avatar}
                width={128}
                height={128}
                className="object-cover rounded-full"
              />
            </div>
          </div>

          {/* actions */}
          <div className="mt-20">
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
                  className={
                    (hasJoinedService ? "btn-primary" : "btn-outlined") +
                    "w-2/3 mx-auto btn-outlined"
                  }
                >
                  <h6 className="">
                    {hasJoinedService ? "Joined" : "Join now"}
                  </h6>
                </button>
              </>
            )}
          </div>

          {/* service details */}
          <h4 className="mt-12 w-4/5 mx-auto">Speakers</h4>
          <div className="flex flex-col space-y-4 items-start w-4/5 mx-auto mt-4">
            {service.speakers.map((speaker) => (
              <UserCard key={speaker.id} speaker={speaker} />
            ))}
          </div>
        </div>

        {/* service details */}
        <div className="flex col-span-2 h-full w-full space-y-4 flex-col"></div>
      </div>
    </Layout>
  );
}

export default ServiceItemDetails;
