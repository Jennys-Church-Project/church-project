import AdminLayout from "../../../components/admin.layout";
import animationData from "../../../public/empty_status.json";
import Lottie from "lottie-react";
import { kAppName } from "../../../utils/constants";

function Counselling() {
  return (
    <AdminLayout>
      <div className="flex flex-col items-center justify-center text-center h-full">
        {/* animation */}
        <Lottie animationData={animationData} />
        <h1 className="text-lg">No counselling sessions available yet</h1>
        <p className="text-black text-opacity-60 text-sm font-serif">
          {kAppName}'s counselling sessions will appear here
        </p>
      </div>
    </AdminLayout>
  );
}

export default Counselling;
