import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD0XQO5hCpPiEcQ5xfzRrxZm21kQMh8nR4",
  authDomain: "chatbuddy-9d4f4.firebaseapp.com",
  databaseURL: "https://chatbuddy-9d4f4-default-rtdb.firebaseio.com",
  projectId: "chatbuddy-9d4f4",
  storageBucket: "chatbuddy-9d4f4.appspot.com",
  messagingSenderId: "1034615009491",
  appId: "1:1034615009491:web:457d568cba558f180a2426",
  measurementId: "G-8WL015BQ1V"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const SnapshotViewer = () => {
  const [snapshots, setSnapshots] = useState([]);

  useEffect(() => {
    // Fetch collection snapshots
    const unsubscribe = onSnapshot(collection(db, 'users'), (querySnapshot) => {
      const snapshotsData = [];
      querySnapshot.forEach((doc) => {
        snapshotsData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setSnapshots(snapshotsData);
    });

    // Cleanup
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Collection Snapshots</h1>
      <ul>
        {snapshots.map(snapshot => (
          <li key={snapshot.id}>
            <pre>{JSON.stringify(snapshot, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SnapshotViewer;
