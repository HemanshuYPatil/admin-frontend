import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';
import { ThemeContext } from "../../../context/ThemeContext";
import { useContext } from "react";
import { LIGHT_THEME, DARK_THEME } from "../../../constants/themeConstants";
import { Link } from 'react-router-dom';
import { getFirestore, collection, onSnapshot, getDocs, query, orderBy, limit } from 'firebase/firestore';

const ChartComponent = () => {
  const { theme } = useContext(ThemeContext);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const db = getFirestore();

    const fetchDocumentCount = async () => {
      const parentCollectionRef = collection(db, 'Bot');
      const parentQuerySnapshot = await getDocs(parentCollectionRef);

      let totalCount = 0;

      await Promise.all(parentQuerySnapshot.docs.map(async parentDoc => {
        const subcollectionRef = collection(parentDoc.ref, 'Ordered');
        const subcollectionQuery = query(subcollectionRef, orderBy('createdAt', 'desc'), limit(1));
        const subcollectionSnapshot = await getDocs(subcollectionRef);

        if (!subcollectionSnapshot.empty) {
          totalCount++;
        }
      }));
      setCount(totalCount);
      setIsLoading(false); // Set loading to false after fetching count
    };

    fetchDocumentCount();

    const unsubscribe = onSnapshot(collection(db, 'Bot'), () => {
      fetchDocumentCount();
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isLoading) { // Render chart only when loading is false
      const options = {
        chart: {
          height: "85%",
          maxWidth: "80%",
          type: "area",
          fontFamily: "Inter, sans-serif",
          dropShadow: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        tooltip: {
          enabled: true,
          x: {
            show: false,
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            opacityFrom: 0.55,
            opacityTo: 0,
            shade: "#1C64F2",
            gradientToColors: ["#1C64F2"],
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 6,
        },
        grid: {
          show: false,
          strokeDashArray: 4,
          padding: {
            left: 2,
            right: 2,
            top: 0
          },
        },
        series: [
          {
            name: "Bots",
            data: [0, count],
            color: "#1A56DB",
          },
        ],
        xaxis: {
          categories: [''],
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          show: false,
        },
      };

      if (document.getElementById("area-chart")) {
        const chart = new ApexCharts(document.getElementById("area-chart"), options);
        chart.render();
      }
    }
  }, [count, isLoading]);

  if (isLoading) {
    return (
      <div role="status"style={{ display: 'flex', alignItems: 'center'}}>
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6" style={{ backgroundColor: theme === DARK_THEME ? "var(--secondary-color)" : "#fafafa", }}>
      <div className="flex justify-between">
        <div>
          <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2" style={{ color: theme === DARK_THEME ? "white" : "black", }}>{count}</h5>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400" style={{ color: theme === DARK_THEME ? "white" : "black", }}>Bots created for orders</p>
        </div>
      </div>
      <div id="area-chart"></div>
      <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
        <div className="flex justify-between items-center pt-5">
          <div id="lastDaysdropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Yesterday</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Today</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 7 days</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 30 days</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 90 days</a>
              </li>
            </ul>
          </div>
          <Link to={'/user/order/orders'}> <a
            className=" text-sm font-semibold inline-flex items-center bg-blue-600 rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500  hover:bg-blue-700 dark:hover:bg-blue-500 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2" style={{ color: theme === DARK_THEME ? "white" : "black", }}>

            View Orders
            <svg className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
            </svg>
          </a></Link>
        </div>
      </div>
    </div>
  );
}

export default ChartComponent;
