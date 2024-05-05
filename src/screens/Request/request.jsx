import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, push, set, remove } from 'firebase/database';
import { MdOutlineMenu } from 'react-icons/md';

import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";
import { LIGHT_THEME, DARK_THEME } from "../../constants/themeConstants";

const Request = () => {
    const [data, setData] = useState([]);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getDatabase();
                const starCountRef = ref(db, 'admin-request');
                onValue(starCountRef, (snapshot) => {
                    const requestData = snapshot.val();
                    if (requestData) {
                        const dataArray = Object.values(requestData);
                        setData(dataArray);
                    } else {
                        setData([]);
                    }
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const acceptRequest = (item) => {
        try {
            const db = getDatabase();


            const acceptedRequestsRef = ref(db, `admins/${item.id}`);

            const modifiedItem = {
                ...item,
                status: 'accepted',
                acceptedTime: new Date().toISOString()
            };


            set(acceptedRequestsRef, modifiedItem);

            const dataRef = ref(db, `admin-request/${item.id}`);


            remove(dataRef)

        } catch (error) {
            console.error("Error accepting request:", error);
        }
    };

    const rejectRequest = (item) => {
        try {
            const db = getDatabase();

            const dataRef = ref(db, `admin-request/${item.id}`);


            remove(dataRef)

        } catch (error) {
            console.error("Error accepting request:", error);
        }
    };

    return (
        <>
            <div className="area-top-l content-area-top">
                <button className="sidebar-open-btn" type="button">
                    <MdOutlineMenu size={24} />
                </button>
                <h2 className="area-top-title text-3xl">Requests</h2>
            </div>
            {/* Render cards */}
            {data.length === 0 ? (
                 <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "75vh" ,color: 'white'}}>
                 <p className="text-xl">No Requests Yet Recieve</p>
               </div>
            ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.map((item, index) => (
                        <div key={index} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow" style={{ backgroundColor: theme === DARK_THEME ? "var(--secondary-color)" : "#fafafa", }}>
                            <div className="flex justify-end px-4 pt-4"></div>
                            <div className="flex flex-col items-center pb-10">
                                <h5 className="mb-1 text-xl font-medium text-gray-900" style={{ color: theme === DARK_THEME ? "white" : "black", }}>{item.Name}</h5>
                                <span className="text-sm text-gray-500" style={{ color: theme === DARK_THEME ? "white" : "black", }}>{item.Email}</span>
                                {/* You can display other properties like Password, Status, etc. */}
                                <div className="flex mt-4 md:mt-6">
                                    <button onClick={() => acceptRequest(item)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Accept</button>
                                    <button onClick={() => rejectRequest(item)} className="py-2 px-4 ms-2 text-sm font-medium text-white focus:outline-none bg-red-600 rounded-lg border border-gray-200 hover:bg-red-700  focus:z-10 focus:ring-4 focus:ring-gray-100">Reject</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Request;
