import AreaCard from "./AreaCard";
import "./AreaCards.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import {db} from '../../../api/config'

const AreaCards = () => {
  
  const [userCount, setUserCount] = useState(null);
  const [usergroup,setusergroup] = useState(null);
  const [userbot,setuserbot] = useState(null);
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {

        let storedCounts = localStorage.getItem('counts');
        if (storedCounts) {
          storedCounts = JSON.parse(storedCounts);
          setUserCount(storedCounts.userCount);
          setusergroup(storedCounts.usergroup);
          setuserbot(storedCounts.userbot);
        }

        const count1 = await getCollectionCount('users');
        const count2 = await getCollectionCount('Groups');
        const count3 = await getCollectionCount('Bot');
        
        setUserCount(count1);
        setusergroup(count2);
        setuserbot(count3);

        localStorage.setItem('counts', JSON.stringify({ userCount: count1, usergroup: count2, userbot: count3 }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getCollectionCount = async (collectionName) => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      return querySnapshot.size;
    } catch (error) {
      console.error('Error getting collection count:', error);
      return -1;
    }
  };
  
 
  const collectionName = 'users';
  getCollectionCount(collectionName)
    .then(count => {
      console.log(`Number of documents in ${collectionName}:`, count);

      setUserCount(count);
    })
    .catch(error => {
      console.error('Error:', error);
    });


    const getgroupcollection = async (collectionName) => {
      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        return querySnapshot.size;
      } catch (error) {
        console.error('Error getting collection count:', error);
        return -1;
      }
    };
    
   
    const groupcollection = 'Groups';
    getgroupcollection(groupcollection)
      .then(count => {
       
        setusergroup(count);
      })
      .catch(error => {
        console.error('Error:', error);
      });


      const getuserbotcollection = async (collectionName) => {
        try {
          const querySnapshot = await getDocs(collection(db, collectionName));
          return querySnapshot.size;
        } catch (error) {
          console.error('Error getting collection count:', error);
          return -1;
        }
      };
      
     
      const userbotcollection = 'Bot';
      getuserbotcollection(userbotcollection)
        .then(count => {
         
          setuserbot(count);
        })
        .catch(error => {
          console.error('Error:', error);
        });

  localStorage.setItem('counts',{userCount,usergroup,userbot})
  return (
    <section className="content-area-cards">
      <AreaCard
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={userCount}  
        cardInfo={{
          title: "Users",
          value: userCount,
          text: "The no of accounts created.",
        
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#4ce13f"]}
        percentFillValue={usergroup}
        cardInfo={{
          title: "Groups",
          value: usergroup,
          text: "No of Group Created in the app",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={userbot}
        cardInfo={{
          title: "Bots",
          value: userbot,
          text: "No of Bot   Created in the app",
        }}
      />
    </section>
  );
};

export default AreaCards;
