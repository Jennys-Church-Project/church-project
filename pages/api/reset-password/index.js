/*
 * File: index.js                                                              *
 * Project: church-project                                                     *
 * Created Date: Thursday, July 1st 2021, 6:00:00 pm                           *
 * -----                                                                       *
 * Last Modified: Thursday, July 1st 2021 6:00:00 pm                           *
 */

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default async function resetPassword(req, res) {
  const { email } = req.body;
  await firebase.auth().sendPasswordResetEmail(email);
  return res.status(200).json({ message: "successful" });
}
