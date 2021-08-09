import { useRouter } from "next/router";
import { useState } from "react";
import AdminLayout from "../../../components/admin.layout";
import Spinner from "../../../components/spinner";
import { kMeetingsRef } from "../../../utils/constants";
import DatePicker from "react-datepicker";

// firebase
import firebase from "firebase/app";
import "firebase/firestore";

function PostNewMeeting() {
  // router
  const router = useRouter();

  // states
  const [timestamp, setTimestamp] = useState(new Date());
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingType, setMeetingType] = useState("youth");
  const [duration, setDuration] = useState(2);
  const [streamLink, setStreamLink] = useState("");
  const [uploading, setUploading] = useState(false);

  // create meeting
  const create = async (e) => {
    e.preventDefault();

    let payload = {
      title: meetingTitle,
      type: meetingType,
      stream_url: streamLink,
      download_url: "",
      date: timestamp.getTime(),
      duration,
      attendants: [],
    };
    let docRef = firebase.firestore().collection(kMeetingsRef).doc();
    payload.id = docRef.id;
    console.log(payload);
    setUploading(true);
    await docRef.set(payload, { merge: true });
    setUploading(false);
    alert("Saved successfully");
    router.push("/admin/meetings");
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
                  {/* title & meeting type */}
                  <div className="grid grid-cols-4 sm:grid-cols-3 gap-6">
                    {/* title */}
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
                          onChange={(e) => setMeetingTitle(e.target.value)}
                          className="focus:ring-black focus:border-black flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                          placeholder="e.g. Youth Meeting"
                        />
                      </div>
                    </div>

                    {/* meeting type */}
                    <div className="col-span-1 sm:col-span-1">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Meeting Type
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          Type
                        </span>
                        <select
                          name="meeting_type"
                          id="meeting_type"
                          required
                          onChange={(e) => setMeetingType(e.target.value)}
                          className="focus:ring-black focus:border-black flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                        >
                          <option value="youth">Youth meeting</option>
                          <option value="leaders">Pastors&apos; Meeting</option>
                        </select>
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
                          required
                          onChange={(e) => setStreamLink(e.target.value)}
                          className="focus:ring-black focus:border-black flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                          placeholder="www.example.com"
                        />
                      </div>
                    </div>

                    <div className="col-span-1 sm:col-span-1">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Duration
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          In hours
                        </span>
                        <input
                          type="number"
                          name="duration"
                          id="duration"
                          required
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          className="focus:ring-black focus:border-black flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                          placeholder="3"
                        />
                      </div>
                    </div>

                    {/* time picker */}
                    <div className="flex flex-col justify-end">
                      <p className="block text-sm font-medium text-gray-700">
                        Meeting happening...
                      </p>
                      <DatePicker
                        selected={timestamp}
                        required={true}
                        className="mt-1 focus:ring-black focus:border-black flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                        onChange={(date) => setTimestamp(date)}
                      />
                    </div>
                  </div>
                </div>

                {/* actions */}
                {uploading ? (
                  <Spinner size={10} />
                ) : (
                  <div className="flex flex-row justify-end items-center space-x-4 px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      className="btn-outlined"
                      type="reset"
                      onClick={() => router.push("/admin/meetings")}
                    >
                      <h6>Cancel</h6>
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                      onClick={create}
                    >
                      <h6>Save changes</h6>
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default PostNewMeeting;
