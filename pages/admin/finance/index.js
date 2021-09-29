import { useEffect, useState } from "react";
import AdminLayout from "../../../components/admin.layout";
import { kAppName } from "../../../utils/constants";

// firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

function FinancialStatusInfo() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    var getPayments = async () => {
      var snapshot = await firebase
        .firestore()
        .collection("welfare")
        .orderBy("created_at", "desc")
        .get();
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
      <div className="flex flex-row justify-between items-center">
        {/* left */}
        <div className="flex flex-col space-y-1">
          {/* title of page */}
          <h2 className="text-3xl">Financial Status</h2>
          <p className="text-sm text-gray-400">
            All payments made by members of the {kAppName}
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}

export default FinancialStatusInfo;
