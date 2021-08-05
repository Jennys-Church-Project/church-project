import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import AdminLayout from "../../../components/admin.layout";
import DropDown from "../../../components/dropdown";
import { kServicesRef, kSpeakersRef } from "../../../utils/constants";
import _ from "lodash";
import { Menu, Dialog, Transition } from "@headlessui/react";
import { v4 as UUID } from "uuid";
import DatePicker from "react-datepicker";
import Spinner from "../../../components/spinner";

// firebase
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

export async function getStaticProps(_context) {
  let speakers = [];
  let db = firebase.firestore();

  // get speakers
  let { docs } = await db.collection(kSpeakersRef).get();

  if (docs) speakers = docs.map((item) => item.data());

  return {
    props: {
      speakers,
    },
  };
}

function PostNewService({ speakers }) {
  // router
  const router = useRouter();

  // state
  const [uploading, setUploading] = useState(false);
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceDesc, setServiceDesc] = useState("");
  const [banner, setBanner] = useState("");
  const [bannerFile, setBannerFile] = useState(null);
  const [streamLink, setStreamLink] = useState("");
  const [selectedSpeakers, setSelectedSpeakers] = useState([]);
  const [timestamp, setTimestamp] = useState(new Date());

  // create a new service
  const createService = async (e) => {
    e.preventDefault();

    let payload = {
      title: serviceTitle,
      desc: serviceDesc,
      banner,
      isOngoing: timestamp.getTime() >= new Date().getTime(),
      speakers: selectedSpeakers.map((person) => person.id),
      date: timestamp.getTime(),
      duration: timestamp.getTime(),
      stream_url: streamLink,
    };
    let docRef = firebase.firestore().collection(kServicesRef).doc();
    payload.id = docRef.id;
    console.log(payload);
    setUploading(true);
    await docRef.set(payload);
    setUploading(false);
    alert("Saved successfully");
    router.push("/admin/service");
  };

  // upload file
  const uploadFile = async () => {
    if (bannerFile) {
      setUploading(true);
      let bucketRef = firebase.storage().ref().child(`services/${UUID()}`);
      bucketRef.put(bannerFile).then(async (snapshot) => {
        let downloadUrl = await snapshot.ref.getDownloadURL();
        console.log(downloadUrl);
        setUploading(false);
        setBanner(downloadUrl);
      });
    }
  };

  return (
    <AdminLayout>
      <div className="w-full h-full flex flex-col">
        {/* header */}
        <div className="flex flex-col">
          {/* title */}
          <h2 className="text-xl">Post a new service</h2>
          <p className="text-sm font-serif text-gray-500">
            Create a new service. This will be available to all members
          </p>
        </div>

        {/* content */}
        <div className="mt-8 w-full flex-1">
          <div className="mt-5 md:mt-0">
            {/* form */}
            <form onSubmit={createService} action="#" method="POST">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  {/* title */}
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Title
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          #
                        </span>
                        <input
                          type="text"
                          name="title"
                          id="title"
                          required
                          onChange={(e) => setServiceTitle(e.target.value)}
                          className="focus:ring-black focus:border-black flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                          placeholder="e.g. Glorious Sunday Service"
                        />
                      </div>
                    </div>
                  </div>

                  {/* stream url & timestamp */}
                  <div className="flex flex-row items-center gap-6">
                    {/* stream url */}
                    <div className="flex-1">
                      <label
                        htmlFor="stream_url"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Streaming link
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          https://
                        </span>
                        <input
                          type="text"
                          name="stream_url"
                          id="stream_url"
                          onChange={(e) => setStreamLink(e.target.value)}
                          className="focus:ring-black focus:border-black flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                          placeholder="www.example.com"
                        />
                      </div>
                    </div>

                    {/* time picker */}
                    <div className="flex flex-col justify-end">
                      <p className="block text-sm font-medium text-gray-700">
                        Event happening...
                      </p>
                      <DatePicker
                        selected={timestamp}
                        required={true}
                        className="mt-1 focus:ring-black focus:border-black flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                        onChange={(date) => setTimestamp(date)}
                      />
                    </div>
                  </div>

                  {/* speakers */}
                  <div className="flex flex-col">
                    <label
                      id="listbox-label"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Assigned to
                    </label>

                    <div className="grid sm:grid-cols-4 md:grid-cols-3">
                      {/* speaker picker */}
                      <div className="mt-1 relative sm:col-span-2 md:col-span-1">
                        <Menu
                          as="div"
                          className="relative inline-block text-left"
                        >
                          {({ open }) => (
                            <>
                              <div className="">
                                <Menu.Button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-transparent">
                                  <div
                                    className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-black focus:border-black sm:text-sm"
                                    aria-haspopup="listbox"
                                    aria-expanded="true"
                                    aria-labelledby="listbox-label"
                                  >
                                    <span className="flex items-center">
                                      <div className="flex-shrink-0 h-6 w-6 rounded-full overflow-hidden">
                                        {selectedSpeakers.length !== 0 && (
                                          <Image
                                            src={
                                              selectedSpeakers[0]?.avatar || " "
                                            }
                                            alt=""
                                            width={24}
                                            height={24}
                                          />
                                        )}
                                      </div>
                                      <span
                                        className={`${
                                          selectedSpeakers.length !== 0 &&
                                          "ml-3"
                                        } block truncate`}
                                      >
                                        {selectedSpeakers[0]?.name ||
                                          "Tap to select"}
                                      </span>
                                    </span>
                                    <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                      <svg
                                        className="h-5 w-5 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </span>
                                  </div>
                                </Menu.Button>
                              </div>

                              {/* dropdown */}
                              <Transition
                                show={open}
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items
                                  static
                                  className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                >
                                  <div className="py-1">
                                    {speakers.map((person) => (
                                      <Menu.Item
                                        as="div"
                                        key={person.id}
                                        onClick={() => {
                                          if (
                                            selectedSpeakers.filter(
                                              (value) => value.id === person.id
                                            ).length !== 0
                                          ) {
                                            _.remove(
                                              selectedSpeakers,
                                              (v, i, arr) => v.id == person.id
                                            );
                                          } else {
                                            selectedSpeakers.push(person);
                                          }

                                          console.log(selectedSpeakers);
                                          setSelectedSpeakers(selectedSpeakers);
                                        }}
                                      >
                                        <div
                                          className="relative w-full bg-white rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-black focus:border-black sm:text-sm"
                                          aria-haspopup="listbox"
                                          aria-expanded="true"
                                          aria-labelledby="listbox-label"
                                        >
                                          <span className="flex items-center">
                                            <div className="flex-shrink-0 h-6 w-6 rounded-full overflow-hidden">
                                              <Image
                                                src={person?.avatar || " "}
                                                alt=""
                                                width={24}
                                                height={24}
                                              />
                                            </div>
                                            <span className="ml-3 block truncate">
                                              {person?.name || "Tap to select"}
                                            </span>
                                          </span>
                                          <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                            <svg
                                              className="h-5 w-5 text-gray-400"
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 20 20"
                                              fill="currentColor"
                                              aria-hidden="true"
                                            >
                                              <path
                                                fillRule="evenodd"
                                                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                              />
                                            </svg>
                                          </span>
                                        </div>
                                      </Menu.Item>
                                    ))}
                                  </div>
                                </Menu.Items>
                              </Transition>
                            </>
                          )}
                        </Menu>
                      </div>

                      {/* selected speakers */}
                      <div className="col-span-2 flex space-x-2 items-center justify-end px-8">
                        {selectedSpeakers.map((person) => (
                          <div
                            key={person.id}
                            className="rounded-full bg-gray-100 flex space-x-1 items-center pr-2"
                          >
                            <div className="overflow-hidden w-7 h-7 rounded-full">
                              <Image
                                src={person.avatar}
                                width={28}
                                height={28}
                                alt={person.id}
                              />
                            </div>

                            {/* name */}
                            <p className="text-xs text-gray-800">
                              {person.name ||
                                `${person.first_name} ${person.last_name}`}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* description */}
                  <div>
                    <label
                      htmlFor="desc"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Brief description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="desc"
                        name="desc"
                        rows="6"
                        onChange={(e) => setServiceDesc(e.target.value)}
                        className="shadow-sm focus:ring-black focus:border-black mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Type a brief description of this service here..."
                      ></textarea>
                    </div>
                  </div>

                  {/* banner */}
                  {uploading ? (
                    <Spinner size={10} />
                  ) : (
                    <div className="flex items-center justify-center space-x-4">
                      {bannerFile && (
                        <div className="flex items-center justify-center cursor-pointer h-32 w-40 overflow-hidden rounded-xl">
                          <img
                            src={URL.createObjectURL(bannerFile)}
                            alt="banner"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}

                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Cover photo
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600 justify-center">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium outline-none ring-0 text-indigo-700 hover:text-black"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  onChange={(e) => {
                                    if (e.target.files) {
                                      setBannerFile(e.target.files[0]);
                                      console.log(bannerFile);
                                      if (bannerFile) uploadFile();
                                    }
                                  }}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* actions */}
                <div className="flex flex-row justify-end items-center space-x-4 px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    className="btn-outlined"
                    type="reset"
                    onClick={() => router.push("/admin/service")}
                  >
                    <h6>Cancel</h6>
                  </button>
                  <button
                    className="btn-primary"
                    type="submit"
                    onClick={createService}
                  >
                    <h6>Save changes</h6>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default PostNewService;
