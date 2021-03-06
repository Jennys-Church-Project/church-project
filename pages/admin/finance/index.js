import { useEffect, useState } from "react";
import AdminLayout from "../../../components/admin.layout";
import { kAppName, kMembersRef, kWelfareRef } from "../../../utils/constants";

// firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import UserFinanceListItem from "../../../components/user.finance.list.item";
import { useRouter } from "next/router";

function FinancialStatusInfo() {
  const router = useRouter();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    var getPayments = async () => {
      var snapshot = await firebase.firestore().collection(kWelfareRef).get();
      if (snapshot.docs) {
        var data = snapshot.docs.map((doc) => doc.data());
        setPayments(data);
      }
    };
    getPayments();
    return null;
  }, []);

  return (
    <AdminLayout>
      <div className="flex flex-col space-y-4 items-start">
        {/* left */}
        <div className="flex flex-col space-y-1">
          {/* title of page */}
          <h2 className="text-3xl">Financial Status</h2>
          <p className="text-sm text-gray-400">
            All payments made by members of the {kAppName}
          </p>
        </div>

        <div className="flex flex-col space-y-2 w-2/3 3xl:w-full">
          {payments.map((item) => (
            <UserFinanceListItem welfare={item} key={item.user} />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

export default FinancialStatusInfo;
