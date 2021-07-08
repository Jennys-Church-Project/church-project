/*
 * File: index.js                                                              *
 * Project: church-project                                                     *
 * Created Date: Thursday, July 1st 2021, 5:46:13 pm                           *
 * -----                                                                       *
 * Last Modified: Thursday, July 1st 2021 5:46:13 pm                           *
*/

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// shows members
export default async function getAllMembers(_req, res) {
  const { docs } = await firebase.firestore().collection("members").get();
  return res.status(200).json(docs.map((member) => member.data()));
}
