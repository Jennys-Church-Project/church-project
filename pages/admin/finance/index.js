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
      <div className="flex flex-col space-y-8 justify-between items-center">
        {/* left */}
        <div className="flex flex-col space-y-1">
          {/* title of page */}
          <h2 className="text-3xl">Financial Status</h2>
          <p className="text-sm text-gray-400">
            All payments made by members of the {kAppName}
          </p>
        </div>

        <div className="w-full px-8 py-6 flex flex-col space-y-2">
          {payments.map((item) => (
            <UserFinanceListItem
              user={item.user}
              key={item.user}
              createdAt={item.created_at}
              amount={item.amount}
            />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

export default FinancialStatusInfo;
