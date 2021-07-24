import { FaLongArrowAltRight } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

function AdminUserCard({ user, isSpeaker, color }) {
  // router
  const router = useRouter();

  // state
  const [person, setPerson] = useState(user);

  // get user instance
  useEffect(async () => {
    let db = firebase.firestore();
    let ref = isSpeaker
      ? db.doc(`speakers/${user.id}`)
      : db.doc(`members/${user.id}`);
    ref.onSnapshot(
      (snapshot) => {
        if (snapshot.exists) {
          setPerson(snapshot.data());
        }
      },
      (err) => {
        alert(err.message);
      }
    );
  }, [user, isSpeaker]);

  return (
    <>
      {person && (
        <div
          onClick={() =>
            router.push(`/admin/${isSpeaker ? "user" : "member"}/${person.id}`)
          }
          className="transition-all duration-300 cursor-pointer w-full overflow-hidden bg-white h-32 rounded-xl flex flex-col relative"
        >
          <div
            className={`bg-${color} absolute top-1/2 -right-1/2 rounded-full w-56 h-56`}
          />
          <FaLongArrowAltRight
            className={`text-white absolute bottom-4 right-4`}
          />

          <div className="flex space-x-2">
            {/* avatar */}
            <div className="w-16 h-16 bg-gray-300 rounded-br-lg overflow-hidden">
              {person.avatar && (
                <Image
                  src={person.avatar}
                  width={64}
                  height={64}
                  objectFit="cover"
                />
              )}
            </div>
            {/* full name */}
            <div className="flex flex-col pt-2 flex-1">
              <h6 className="text-sm">
                {isSpeaker
                  ? person.name
                  : `${person.first_name} ${person.last_name}`}
              </h6>
              <p className="text-xs text-gray-600 font-serif">
                {isSpeaker ? person.church : person.email}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminUserCard;
