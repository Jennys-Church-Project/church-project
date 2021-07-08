/*
 * File: auth.provider.js                                                      *
 * Project: church-project                                                     *
 * Created Date: Monday, June 28th 2021, 1:36:00 pm                            *
 * -----                                                                       *
 * Last Modified: Tuesday, June 29th 2021 1:02:55 pm                           *
 */

// reference -> https://colinhacks.com/essays/nextjs-firebase-authentication
import { createContext, useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import nookies from "nookies";
import { useContext } from "react";
import { kUser, kUserId, kUserToken } from "../utils/constants";

const AuthContext = createContext({
  user: null,
  loading: true,
});

function AuthProvider({ context, children }) {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setLoading] = useState(false);

  // handle auth logic here...
  useEffect(async () => {
    setLoading(true);
    const currentFirebaseUser = firebase.auth().currentUser;
    console.log({ firebaseUser: currentFirebaseUser });
    return firebase
      .firestore()
      .collection("members")
      // TODO -> replace with current user's id
      .doc("Dpv7egrPwIeiKuveMUxQsNtirI42")
      .onSnapshot(
        (snapshot) => {
          setLoading(false);
          if (!snapshot.exists) {
          } else {
            const user = snapshot.data();
            if (!user) {
              setCurrentUser(null);
              nookies.set(context, kUserToken, "", { path: "/" });
              nookies.set(context, kUserId, "", { path: "/" });
            } else {
              const token = user.token;
              setCurrentUser(user);
              nookies.set(context, kUserToken, token, { path: "/dashboard" });
              nookies.set(context, kUserId, user.uid, { path: "/dashboard" });
              nookies.set(context, kUser, user, { path: "/dashboard" });
            }
            setLoading(false);
          }
        },
        (err) => {
          setLoading(false);
          console.error({ err });
          setCurrentUser(null);
        }
      );
    // return firebase.auth().onAuthStateChanged(async (user) => {
    //   console.log(`token -> ${user}`);
    //   if (!user) {
    //     setCurrentUser(null);
    //     nookies.set(context, kUserToken, "", { path: "/" });
    //     nookies.set(context, kUserId, "", { path: "/" });
    //   } else {
    //     const token = await user.getIdToken();
    //     setCurrentUser(user);
    //     console.log(`token -> ${token}`);
    //     nookies.set(context, kUserToken, token, { path: "/dashboard" });
    //     nookies.set(context, kUserId, user.uid, { path: "/dashboard" });
    //   }
    //   setLoading(false);
    // });
  }, []);
  return (
    <AuthContext.Provider value={{ user: currentUser, loading: isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

// custom hook to use the AuthContext and access user and loading
export const useAuth = () => useContext(AuthContext);
