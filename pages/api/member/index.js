/*
 * File: member.js                                                             *
 * Project: church-project                                                     *
 * Created Date: Friday, June 25th 2021, 2:23:17 pm                            *
 * -----                                                                       *
 * Last Modified: Friday, June 25th 2021 2:30:12 pm                            *
 */

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// shows the details of the currently logged in member
export default async function getCurrentUser(req, res) {
  const { uid, isMember } = req.body;

  if (!uid) return res.status(400).json({ message: "not signed in" });

  const snapshot = await firebase
    .firestore()
    .collection(isMember ? "members" : "admin")
    .doc(uid)
    .get();

  if (!snapshot.exists)
    return res.status(404).json({ message: "member not found" });
  const member = snapshot.data();
  return res.status(200).json(member);
}
