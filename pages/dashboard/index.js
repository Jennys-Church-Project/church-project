/*
 * File: dashboard.js                                                          *
 * Project: church-project                                                     *
 * Created Date: Monday, June 28th 2021, 2:03:59 pm                            *
 * -----                                                                       *
 * Last Modified: Monday, June 28th 2021 2:04:41 pm                            *
 */

import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { kAppName } from "../../utils/constants";
import Spinner from "../../components/spinner";

// firebase
import firebase from "firebase/app";
import "firebase/auth";

function Dashboard() {
  // router
  const router = useRouter();

  // load user account details
  useEffect(async () => {
    // get current user instance
    let user = firebase.auth().currentUser;
    if (user) router.push("/dashboard/service");
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

export default Dashboard;
