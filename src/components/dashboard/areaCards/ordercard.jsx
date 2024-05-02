import React, { useState, useEffect } from "react";
import AreaCard from "./AreaCard";
import "./AreaCards.scss";
import { getFirestore, collectionGroup, getDocs, collection, where, query, getDoc, doc } from "firebase/firestore";
import { db } from "../../../api/config";
import { MdOutlineMenu } from "react-icons/md";
const Ordercard = () => {
  const [userCount, setUserCount] = useState(null);
  const [usergroup, setUserGroup] = useState(null);
  const [acceptedBotCount, setAcceptedBotCount] = useState(null);
  const [rejectedBotCount, setRejectedBotCount] = useState(null);
  const [pendingBotCount, setpendingBotCount] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {

        const botCount = await getCollectionCount("Bot");
        setUserCount(botCount);


        const groupCount = await getCollectionCount("Groups");
        setUserGroup(groupCount);


        const acceptedCount = await getStatusCount("Bot", "Accepted");
        setAcceptedBotCount(acceptedCount);

        const rejectedCount = await getStatusCount("Bot", "Rejected");
        setRejectedBotCount(rejectedCount);

        const pendingCount = await getStatusCount("Bot", "");
        setpendingBotCount(pendingCount);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getCollectionCount = async (collectionName) => {
    try {
      const querySnapshot = await getDocs(collectionGroup(db, collectionName));
      return querySnapshot.size;
    } catch (error) {
      console.error("Error getting collection count:", error);
      return -1;
    }
  };


const getStatusCount = async (collectionName, status) => {
    try {
      const botQuerySnapshot = await getDocs(collection(db, collectionName));
      let count = 0;
      
      for (const botDoc of botQuerySnapshot.docs) {
        const orderedQuerySnapshot = await getDocs(collection(db, `${collectionName}/${botDoc.id}/Ordered`));
        
       
        orderedQuerySnapshot.forEach(orderedDoc => {
       
          if (orderedDoc.data().Status === status) {
            count++;
          }
        });
      }
  
      return count;
    } catch (error) {
      console.error("Error getting status count:", error);
      return -1;
    }
  };
  

  return (
    <section className="area-cards">
      <div className="area-top-l mb-5">
        <button className="sidebar-open-btn" type="button">
          <MdOutlineMenu size={24} />
        </button>
        <h2 className="area-top-title text-3xl">Orders</h2>
      </div>

      <div className="content-area-cards">
        <AreaCard
          colors={["#e4e8ef", "#f29a2e"]}
          percentFillValue={acceptedBotCount}
          cardInfo={{
            title: "Accepted",
            value: acceptedBotCount,
            text: "No of Order Accepted in app.",
          }}
        />
        <AreaCard
          colors={["#e4e8ef", "#f29a2e"]}
          percentFillValue={rejectedBotCount}
          cardInfo={{
            title: "Rejected",
            value: rejectedBotCount,
            text: "No of Order Rejected in the app.",
          }}
        />
        <AreaCard
          colors={["#e4e8ef", "#f29a2e"]}
          percentFillValue={pendingBotCount}
          cardInfo={{
            title: "Pending",
            value: pendingBotCount,
            text: "No of Order Pending in the app.",
          }}
        />
      </div>
    </section>
  );
};


export default Ordercard;
