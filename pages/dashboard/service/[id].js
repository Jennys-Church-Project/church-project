/*
 * File: [id].js                                                               *
 * Project: church-project                                                     *
 * Created Date: Th Jul yyyy                                                   *
 * Author: <<author>                                                           *
 * -----                                                                       *
 * Last Modified: Thu Jul 08 2021                                              *
 * Modified By: Windows 11 User                                                *
 * -----                                                                       *
 * Copyright (c) 2021 Windows 11 User                                          *
 */

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../components/layout";
import Spinner from "../../../components/spinner";

// firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

function ServiceItemDetails() {
  // router
  const router = useRouter();

  // get id
  const { id } = router.query;

  // loading
  const [loading, setLoading] = useState(true);

  // service
  const [service, setService] = useState(null);

  useEffect(async () => {
    setLoading(true);
    const res = await firebase.firestore().doc(`services/${id}`).get();
    setLoading(false);
    if (res.exists) setService(res.data());

    return null;
  }, []);

  return (
    <Layout>
      {loading || service === null ? (
        <div className="flex flex-col items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="">
            <p className="">{service.title}</p>
          </div>
        </>
      )}
    </Layout>
  );
}

export default ServiceItemDetails;
