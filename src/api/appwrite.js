import { Client, Account, ID } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65c0d05506e3ce1df2dc");

const storeInfo = async () => {
  try {
    const collectionId = "YOUR_COLLECTION_ID"; 
    const data = {
   
      key1: "value1",
      key2: "value2",

    };

    const response = await client.database.createDocument(collectionId, data);
    console.log("Document created:", response);
    alert("Information stored successfully!");
  } catch (error) {
    console.error("Error storing information:", error);
    alert("Failed to store information.");
  }
};
