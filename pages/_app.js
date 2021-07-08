/*
 * File: _app.js                                                               *
 * Project: church-project                                                     *
 * Created Date: Thursday, June 3rd 2021, 10:09:34 am                          *
 * -----                                                                       *
 * Last Modified: Monday, June 28th 2021 4:08:50 pm                            *
 */

import AuthProvider from "../providers/auth.provider";
import "../styles/globals.css";
import firebase from "../firebase/index";

// initialize firebase
firebase();

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
