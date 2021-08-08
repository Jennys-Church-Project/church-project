/*
 * File: index.js                                                              *
 * Project: church-project                                                     *
 * Created Date: Friday, June 18th 2021, 6:47:26 am                            *
 * -----                                                                       *
 * Last Modified: Tuesday, June 29th 2021 5:56:45 pm                           *
 */

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/messaging";

export default async function registerMember(req, res) {
  const {
    first_name,
    last_name,
    middle_name,
    email,
    password,
    dob,
    position,
    contact,
    hometown,
    nationality,
    address,
    avatar,
  } = req.body;

  console.log(req.body);

  try {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    if (!user)
      return res.status(400).json({ message: "user account already exists" });

    // token
    const token = await user.getIdToken();

    // save members doc
    await firebase.firestore().collection("members").doc(user.uid).set(
      {
        first_name,
        last_name,
        middle_name,
        email,
        id: user.uid,
        token,
        avatar,
        dob,
        address,
        position,
        contact,
        hometown,
        nationality,
        created_at: new Date().getTime(),
      },
      { merge: true }
    );

    return res.status(200).json({ data: req.body });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
