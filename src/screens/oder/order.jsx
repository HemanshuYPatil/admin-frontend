import React, { useState, useEffect, useContext } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { DARK_THEME } from "../../constants/themeConstants";
import { ThemeContext } from "../../context/ThemeContext";
import { db, onSnapshot, collection,searchDocumentId } from '../../api/config';
import { SlArrowRight } from "react-icons/sl";
import './order.css';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const unsubscribe = fetchOrders();

    return () => {
      unsubscribe();
    };
  }, []);

  const fetchOrders = () => {
    try {
      const collectionRef = collection(db, 'Bot');

      return onSnapshot(collectionRef, querySnapshot => {
        const botData = [];
        querySnapshot.forEach(doc => {
          const subcollectionRef = collection(doc.ref, 'Ordered');
          const subUnsubscribe = onSnapshot(subcollectionRef, subSnapshot => {
            const subData = subSnapshot.docs.map(subDoc => ({
              id: subDoc.id,
              ...subDoc.data()
            }));
            botData.push(...subData);
            setOrders(botData);
          });
        });
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const getStatusElement = (status) => {
    switch (status) {
      case "Accepted":
        return (
          <span className="inline-flex items-center bg-green-600 text-white text-xs font-medium px-2.5 py-1.5 rounded-lg dark:bg-green-900 dark:text-green-300">
            {status}
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center bg-red-600 text-white text-xs font-medium px-2.5 py-1.5 rounded-lg dark:bg-red-900 dark:text-red-300">
            {status}
          </span>
        );
      case "":
        return (
          <span className="inline-flex items-center bg-yellow-600 text-white text-xs font-medium px-2.5 py-1.5 rounded-lg dark:bg-yellow-900 dark:text-yellow-300">
            Pending
          </span>
        );
      default:
        return null; // No specific style for other 
    }
  };


  return (
    <section className="content-area-top">
      <div className="area-top-l mb-5">
        <button className="sidebar-open-btn" type="button">
          <MdOutlineMenu size={24} />
        </button>
        <h2 className="area-top-title text-3xl">Orders</h2>
      </div>

      <div className="w-full h-full overflow-hidden">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-full">
          <table
            style={{ background: theme === DARK_THEME ? "#252538" : "#FFFFFF" }}
            className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
          >
            <thead
              style={{ backgroundColor: theme === DARK_THEME ? "#383854" : "#F2F4FF" }}
              className="text-sm text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr className="text-white"  style={{ color: theme === DARK_THEME ? "white" : "black" }}>
                <th scope="col" className="px-6 py-3"> # </th>
                <th scope="col" className="px-6 py-3"> Order ID </th>
                <th scope="col" className="px-6 py-3"> Name</th>

                <th scope="col" className="px-6 py-3"> Item </th>
                <th scope="col" className="px-6 py-3"> Address </th>
                <th scope="col" className="px-6 py-3"> Contact No </th>
                <th scope="col" className="px-6 py-3"> Price </th>
                <th scope="col" className="px-6 py-3"> Status </th>
             
              </tr>
            </thead>
            <tbody style={{ paddingTop: "20px", color: theme === DARK_THEME ? "white" : "black" }}>
              {orders.map((order, index) => (
                <tr key={order.id} className="text-white" style={{ color: theme === DARK_THEME ? "white" : "black" }} onClick={() => handleRowClick(order.ID)}>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{order.OrderId}</td>
                  <td className="px-6 py-4">{order.Customer}</td>

                  <td className="px-6 py-4">{order.Ordered_item}</td>
                  <td className="px-6 py-4">{order.Delivery_location}</td>
                  <td className="px-6 py-4">{order.Customer_phone}</td>

                  <td className="px-6 py-4"> {order.Price ? `₹${order.Price}` : "Pending"}</td>
                  <td className="px-6 py-4">{getStatusElement(order.Status)}</td>
                  
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Order;
