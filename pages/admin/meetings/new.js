import { useRouter } from "next/router";
import { useState } from "react";
import AdminLayout from "../../../components/admin.layout";
import { kMeetingsRef } from "../../../utils/constants";
import { v4 as UUID } from "uuid";
import DatePicker from "react-datepicker";

// firebase
import firebase from "firebase/app";
import "firebase/firestore";

function PostNewMeeting() {
  // router
  const router = useRouter();

  // states
  const [timestamp, setTimestamp] = useState(0);
  const [meetingTitle, setMeetingTitle] = useState("");

  // create meeting
  const create = async (e) => {
    e.preventDefault();

    let payload = {
      title: meetingTitle,
      date: timestamp.getTime(),
      duration: timestamp.getTime(),
    };
    let docRef = firebase.firestore().collection(kMeetingsRef).doc();
    payload.id = docRef.id;
    console.log(payload);

    alert("Saved successfully");
  };

  return (
    <AdminLayout>
      <div className="w-full h-full flex flex-col">
        {/* header */}
        <div className="flex flex-col">
          {/* title */}
          <h2 className="text-xl">Post a new meeting</h2>
          <p className="text-sm font-serif text-gray-500">
            Create a new meeting. This will be available to all members
          </p>
        </div>

        {/* content */}
        <div className="mt-8 w-full flex-1">
          <div className="mt-5 md:mt-0">
            {/* form */}
            <form action="#" onSubmit={create}>
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
                          onChange={(e) => setMeetingTitle(e.target.value)}
                          className="focus:ring-black focus:border-black flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                          placeholder="e.g. Glorious Sunday Service"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* actions */}
                <div className="flex flex-row justify-end items-center space-x-4 px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    className="btn-outlined"
                    onClick={() => router.push("/admin/meetings")}
                  >
                    <h6>Cancel</h6>
                  </button>
                  <button
                    className="btn-primary"
                    // disabled={true}
                    onClick={create}
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

export default PostNewMeeting;
