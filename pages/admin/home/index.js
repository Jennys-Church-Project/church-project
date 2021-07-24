import { useRouter } from "next/router";
import AdminLayout from "../../../components/admin.layout";
import DashboardHeaderCardItem from "../../../components/dashboard.header.card";
import { kAppName } from "../../../utils/constants";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";
import { MdSupervisorAccount } from "react-icons/md";

// admin dashboard
function AdminHome() {
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
            <h2 className="text-3xl">Home</h2>
            <p className="text-sm text-gray-400">
              Shows a curated list of all registered members of the {kAppName}
            </p>
          </div>

          {/* right */}
          <button
            className="btn-primary"
            onClick={() => router.push("/register")}
          >
            <h6>Add a new member</h6>
          </button>
        </div>

        {/* body */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-x-6">
          <DashboardHeaderCardItem
            title={"Users onsite"}
            subtitle={"456"}
            Icon={RiAccountPinCircleLine}
          />
          <DashboardHeaderCardItem
            title={"Pastors"}
            subtitle={"26"}
            Icon={BsFillPersonFill}
          />
          <DashboardHeaderCardItem
            title={"Members"}
            subtitle={"123"}
            Icon={MdSupervisorAccount}
          />
          {/* <DashboardHeaderCardItem title={""} subtitle={""} Icon={} /> */}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminHome;
