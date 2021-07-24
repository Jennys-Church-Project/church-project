import AdminLayout from "../../../components/admin.layout";
import { useEffect, useState } from "react";
import Image from "next/image";
import { RiImageAddFill } from "react-icons/ri";

// firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export async function getStaticPaths() {
  // get all services
  const db = firebase.firestore();
  const res = await db.collection("members").get();

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

export async function getStaticProps({ params }) {
  // url
  let { id } = params;
  let person = {};

  const db = firebase.firestore();
  const snapshot = await db.doc(`members/${id}`).get();

  if (snapshot.exists) {
    person = snapshot.data();
  }

  return {
    props: {
      person,
    },
  };
}

function UserDetails({ person }) {
  // state
  const [user, setUser] = useState(person);
  const [editableUser, setEditableUser] = useState(person);
  const [hasPickedImage, setHasPickedImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // get user instance
  useEffect(async () => {
    let db = firebase.firestore();
    db.doc(`members/${person.id}`).onSnapshot(
      (snapshot) => {
        if (snapshot.exists) {
          setUser(snapshot.data());
        }
      },
      (err) => {
        alert(err.message);
      }
    );
  }, [person]);

  // update user
  const updateUser = async (ev) => {
    ev.preventDefault();

    console.log(ev.target);
  };

  // pick image from device
  const pickImage = async (ev) => {};

  return (
    <AdminLayout>
      <div className="w-full h-full relative flex flex-col space-y-8">
        {/* top -> user profile picture */}
        <div className="flex flex-row space-x-4 relative items-center">
          {/* avatar section */}
          <div className="bg-gray-300 rounded-full w-24 h-24 relative">
            <div
              className="absolute w-8 h-8 flex items-center justify-center cursor-pointer bg-gray-300 border-4 border-white z-10 rounded-full overflow-hidden top-0 right-0"
              onClick={pickImage}
            >
              <RiImageAddFill />
            </div>
            {hasPickedImage && <></>}
            {user.avatar && (
              <div className="overflow-hidden rounded-full h-full w-full border-4 border-white">
                <Image
                  src={user.avatar}
                  objectFit="cover"
                  width={96}
                  height={96}
                />
              </div>
            )}
          </div>

          {/* username section */}
          <div className="flex-1 flex flex-col justify-center items-start">
            {/* full name */}
            <h4>
              {user.first_name} {user.last_name}
            </h4>

            {/* info */}
            <p className="text-sm text-gray-400 font-serif">
              Manage user&apos;s personal information, password and more
            </p>
          </div>
        </div>

        {/* personal info */}
        <div className="flex-1 flex flex-col space-y-4">
          <h2 className="text-2xl">Personal Information</h2>
          <form onSubmit={updateUser}>
            <div className="form-row">
              {/* first name */}
              <div className="form-control">
                <label htmlFor="first_name">First Name</label>
                <input
                  type="text"
                  placeholder="e.g. John"
                  name="first_name"
                  onChange={(e) =>
                    setEditableUser({
                      ...editableUser,
                      first_name: e.target.value,
                    })
                  }
                  value={editableUser.first_name}
                  required
                />
              </div>

              {/* middle name */}
              <div className="form-control">
                <label htmlFor="middle_name">Middle Name</label>
                <input
                  type="text"
                  placeholder="e.g. Alex"
                  onChange={(e) =>
                    setEditableUser({
                      ...editableUser,
                      middle_name: e.target.value,
                    })
                  }
                  value={editableUser.middle_name}
                  name="middle_name"
                />
              </div>

              {/* last name */}
              <div className="form-control">
                <label htmlFor="last_name">Last Name</label>
                <input
                  type="text"
                  placeholder="e.g. Doe"
                  name="last_name"
                  onChange={(e) =>
                    setEditableUser({
                      ...editableUser,
                      last_name: e.target.value,
                    })
                  }
                  value={editableUser.last_name}
                  required
                />
              </div>
            </div>

            {/* email & contact section */}
            <div className="form-row">
              {/* email address */}
              <div className="form-control form-row-2">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. john.doe@mail.com"
                  name="email"
                  value={user.email}
                  disabled={true}
                  required
                />
              </div>

              {/* contact */}
              <div className="form-control">
                <label htmlFor="contact">Phone Number</label>
                <input
                  type="number"
                  placeholder="e.g. 05541234569"
                  name="contact"
                  value={editableUser.contact}
                  onChange={(e) =>
                    setEditableUser({
                      ...editableUser,
                      contact: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* nationality & dob section */}
            <div className="form-row">
              {/* home town */}
              <div className="form-control">
                <label htmlFor="hometown">Hometown</label>
                <input
                  type="text"
                  placeholder="e.g. Accra Central"
                  name="hometown"
                  value={editableUser.hometown}
                  onChange={(e) =>
                    setEditableUser({
                      ...editableUser,
                      hometown: e.target.value,
                    })
                  }
                />
              </div>

              {/* dob */}
              <div className="form-control">
                <label htmlFor="dob">Date of Birth</label>
                <input
                  type="text"
                  placeholder="e.g. 23/08/1993"
                  name="dob"
                  value={editableUser.dob}
                  onChange={(e) =>
                    setEditableUser({
                      ...editableUser,
                      dob: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* nationality */}
              <div className="form-control">
                <label htmlFor="nationality">Nationality</label>
                <input
                  type="text"
                  placeholder="e.g. Ghanaian"
                  value={"Ghanaian"}
                  name="nationality"
                  disabled={true}
                  value={editableUser.nationality}
                  onChange={(e) =>
                    setEditableUser({
                      ...editableUser,
                      nationality: e.target.value,
                    })
                  }
                  className=""
                />
              </div>
            </div>

            <div className="form-row">
              {/* physical address */}
              <div className="form-control">
                <label htmlFor="address">Ghana Post Address</label>
                <input
                  type="text"
                  placeholder="GA-512-9090"
                  name="address"
                  value={editableUser.address}
                  onChange={(e) =>
                    setEditableUser({
                      ...editableUser,
                      address: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* physical address */}
              <div className="form-control form-row-2">
                <label htmlFor="position">Position</label>
                <input
                  type="text"
                  placeholder="e.g. Deacon"
                  name="position"
                  value={editableUser.position}
                  onChange={(e) =>
                    setEditableUser({
                      ...editableUser,
                      position: e.target.value,
                    })
                  }
                  disabled={true}
                />
              </div>
            </div>

            {/* submit */}
            <button
              type="submit"
              disabled={user === editableUser}
              className={`${
                loading ? "btn-outlined" : "btn-primary"
              }  float-right mt-4`}
            >
              <h6 className="">
                {loading ? "Please wait..." : "Save & continue"}
              </h6>
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

export default UserDetails;
