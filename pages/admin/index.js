import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { kAppName } from "../../utils/constants";
import Spinner from "../../components/spinner";

// firebase
import firebase from "firebase/app";
import "firebase/auth";

// admin dashboard
function AdminHome() {
  // router
  const router = useRouter();

  // load user account details
  useEffect(async () => {
    // get current user instance
    let user = firebase.auth().currentUser;
    if (user) router.push("/admin/home");
    else router.push("/");
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <Head>
        <title>{kAppName}</title>
      </Head>

      <Spinner isAbsolute />
    </div>
  );
}

export default AdminHome;
