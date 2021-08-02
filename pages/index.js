/*
 * File: index.js                                                              *
 * Project: church-project                                                     *
 * Created Date: Thursday, June 3rd 2021, 10:09:34 am                          *
 * -----                                                                       *
 * Last Modified: Tuesday, June 29th 2021 1:00:53 pm                           *
 */

import Head from "next/head";
import Header from "../components/header";
import Hero from "../components/hero";
import About from "../components/about";
import Activities from "../components/activities";
import Schedule from "../components/schedule";
import FAQs from "../components/faqs";
import Footer from "../components/footer";
import { kAppName, kUserId, kUserToken, kUserType } from "../utils/constants";

// firebase
import firebase from "firebase/app";
import "firebase/auth";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  // router instance
  const router = useRouter();

  // get current user instance
  useEffect(async () => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        console.log(`signed in as ${user.email}`);
        localStorage.setItem(kUserId, user.uid);
        localStorage.setItem(kUserToken, await user.getIdToken());
        router.push(user.email.startsWith("admin") ? "/admin" : "/dashboard");
      }
    });
    return null;
  }, []);

  return (
    <div className="w-screen min-h-screen bg-secondary">
      <Head>
        <title>{kAppName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Hero />
      <About />
      <Activities />
      <Schedule />
      <FAQs />
      <Footer />
    </div>
  );
}
