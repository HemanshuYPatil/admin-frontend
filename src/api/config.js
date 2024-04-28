import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore, collection, onSnapshot,query,doc,getDocs,collectionGroup } from 'firebase/firestore';



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


  const real = getDatabase(app);


  const searchDocumentId = async ( documentId) => {
    try {
      // Get all documents in the collection group
      const q = query(collectionGroup(db, 'Bot'));
  
      const querySnapshot = await getDocs(q);
  
      // Iterate through each document
      for (const docRef of querySnapshot.docs) {
        // Get the document data
        const docData = docRef.data();
  
        // Check if the document ID matches
        if (docRef.id === documentId) {
          return true; // Document ID found in main collection
        }
  
        // Iterate through each subcollection
        const subCollections = await doc(docRef.ref.path).listCollections();
        for (const subCollectionRef of subCollections) {
          // Get all documents in the subcollection
          const subQuerySnapshot = await getDocs(subCollectionRef);
  
          // Check if the document ID matches in the subcollection
          for (const subDocRef of subQuerySnapshot.docs) {
            if (subDocRef.id === documentId) {
              return true; // Document ID found in subcollection
            }
          }
        }
      }
  
      return false; // Document ID not found
    } catch (error) {
      console.error('Error searching document ID:', error);
      return false; // Return false on error
    }
  };
  
  export {db,collection,onSnapshot,real,searchDocumentId};


