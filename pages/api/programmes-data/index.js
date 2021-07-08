/*
 * File: index.js                                                              *
 * Project: church-project                                                     *
 * Created Date: Thursday, June 24th 2021, 6:07:08 am                          *
 * -----                                                                       *
 * Last Modified: Thursday, June 24th 2021 8:31:09 am                          *
 */

import firebase from "firebase/app";
import "firebase/firestore";

export default async function getProgrammes(_req, res) {
  try {
    const snapshot = await firebase.firestore().collection("programmes").get();

    const programmes = [];
    if (snapshot.docs) {
      snapshot.docs.forEach((doc) => {
        programmes.push(doc.data());
      });
    }

    return res.json(programmes);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
