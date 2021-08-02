import AdminLayout from "../../../components/admin.layout";
import Lottie from "lottie-react";
import animationData from "../../../public/empty_status.json";
import { kAppName } from "../../../utils/constants";
import ServiceCard from "../../../components/service.card";
import { useRouter } from "next/router";

// firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

function Meetings() {
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
      </div>
    </AdminLayout>
  );
}

export default Meetings;
