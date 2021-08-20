import AdminLayout from "../../../components/admin.layout";
import Spinner from "../../../components/spinner";
import { useEffect, useState } from "react";
import Image from "next/image";
import { RiImageAddFill } from "react-icons/ri";
import { format } from "date-fns";
import DatePicker from "react-datepicker";

// firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

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
  const [avatarFile, setAvatarFile] = useState(null);

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
    setLoading(true);

    // save user details
    await firebase
      .firestore()
      .doc(`members/${user.id}`)
      .set(
        {
          ...editableUser,
          updated_at: new Date().getTime(),
        },
        { merge: true }
      );

    setLoading(false);
  };

  // pick image from device
  const pickImage = async () => {
    document.getElementById("profile_avatar").click();
  };

  // handle file changes
  const onFilePickerChanged = (ev) => {
    let file = ev.target.files[0];
    if (file.type.startsWith("image/")) {
      console.log(ev);
      setHasPickedImage(true);
      setAvatarFile(file);
    } else {
      confirm("invalid file type selected. Try again");
    }
  };

  // upload file to storage bucket
  const uploadImage = async () => {
    if (hasPickedImage) {
      setUploading(true);
      let bucketRef = firebase.storage().ref().child(`user/${user.id}`);
      bucketRef.put(avatarFile).then(async (snapshot) => {
        let downloadUrl = await snapshot.ref.getDownloadURL();
        console.log(downloadUrl);
        setUploading(false);
        setEditableUser({ ...editableUser, avatar: downloadUrl });
        setAvatarFile(null);
        setHasPickedImage(false);
      });
    }
  };

  return (
    <AdminLayout>
      <div className="w-full h-full relative flex flex-col space-y-8">
        {/* top -> user profile picture */}
        <div className="flex flex-row space-x-4 relative items-center">
          {/* avatar section */}
          <div className="flex flex-col space-y-1 items-center">
            <div className="bg-gray-300 rounded-full w-24 h-24 relative">
              <div
                className="absolute w-8 h-8 flex items-center justify-center cursor-pointer bg-gray-300 border-4 border-white z-10 rounded-full overflow-hidden top-0 right-0"
                onClick={pickImage}
              >
                <RiImageAddFill />
                <input
                  type="file"
                  id="profile_avatar"
                  onChange={onFilePickerChanged}
                  hidden
                />
              </div>
              {uploading && (
                <div className="absolute h-full w-full bg-black bg-opacity-30 rounded-full overflow-hidden flex items-center justify-center">
                  <Spinner size={8} />
                </div>
              )}
              {!hasPickedImage && editableUser.avatar && (
                <div className="overflow-hidden rounded-full h-full w-full border-4 border-white">
                  <Image
                    src={editableUser.avatar}
                    objectFit="cover"
                    width={96}
                    height={96}
                  />
                </div>
              )}
            </div>

            {/* upload button */}
            {hasPickedImage && (
              <>
                <button
                  type="button"
                  hidden={avatarFile === null}
                  className={`${uploading ? "btn-outlined" : "btn-primary"}`}
                  onClick={uploadImage}
                >
                  <h6 className="">{uploading ? "Uploading..." : "Upload"}</h6>
                </button>
              </>
            )}
          </div>

          {/* user details section */}
          <div className="flex-1 flex flex-col justify-center items-start">
            {/* full name */}
            <h4>
              {user.first_name} {user.middle_name} {user.last_name}
            </h4>

            {/* info */}
            <p className="text-sm text-gray-400 font-serif">
              Manage user&apos;s personal information and more
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
              <div className="form-control">
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
            </div>

            {/* nationality & dob section */}
            <div className="form-row">
              {/* dob */}
              <div className="form-control flex flex-col">
                <label htmlFor="dob">Date of Birth</label>
                <DatePicker
                  id="dob"
                  selected={new Date(editableUser.dob)}
                  required={true}
                  className="focus:ring-black focus:border-black w-full rounded-full sm:text-sm border-gray-300"
                  onChange={(date) =>
                    setEditableUser({
                      ...editableUser,
                      dob: date.getTime(),
                    })
                  }
                />
                {/* <input
                  type="text"
                  placeholder="e.g. 23/08/1993"
                  name="dob"
                  value={format(editableUser.dob, "dd/MM/yyyy")}
                  onChange={(e) =>
                    setEditableUser({
                      ...editableUser,
                      dob: e.target.value,
                    })
                  }
                  required
                /> */}
              </div>

              {/* nationality */}
              <div className="form-control">
                <label htmlFor="nationality">Nationality</label>
                <input
                  type="text"
                  placeholder="e.g. Ghanaian"
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
            </div>

            <div className="form-row">
              {/* physical address */}
              <div className="form-control">
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
            {loading ? (
              <>
                <Spinner />
              </>
            ) : (
              <>
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
              </>
            )}
          </form>
        </div>

        {/* financial info */}
        <div className="flex-1 flex flex-col space-y-4">
          {/* <h2 className="text-2xl">Financial Status</h2> */}
        </div>
      </div>
    </AdminLayout>
  );
}

export default UserDetails;
