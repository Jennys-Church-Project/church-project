import AdminLayout from "../../../components/admin.layout";
import { useEffect, useState } from "react";

// firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export async function getStaticPaths() {
  // get all services
  const db = firebase.firestore();
  const res = await db.collection("speakers").get();

  // construct paths
  const paths = res.docs.map((doc) => {
    return {
      params: {
        id: doc.id,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // url
  let { id } = params;
  let person = {};

  const db = firebase.firestore();
  const snapshot = await db.doc(`speakers/${id}`).get();

  if (snapshot.exists) {
    person = snapshot.data();
  }

  return {
    props: {
      person,
    },
  };
}

function AdminDetails({ person }) {
  // state
  const [user, setUser] = useState(person);

  // get user instance
  useEffect(async () => {
    let db = firebase.firestore();
    db.doc(`members/${person.id}`).onSnapshot(
      (snapshot) => {
        if (snapshot.exists) {
          setUser(snapshot.data());
        }
      },
      (err) => {
        alert(err.message);
      }
    );
  }, [person]);

  return (
    <AdminLayout>
      <div>User details page {user.name}</div>
    </AdminLayout>
  );
}

export default AdminDetails;
