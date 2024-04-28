
import React, { useState, useEffect, useContext } from 'react';
import { db, onSnapshot, collection } from '../../../api/config';
import AreaTableAction from "./AreaTableAction";
import "./AreaTable.scss";
import { ThemeContext } from "../../../context/ThemeContext";
import { LIGHT_THEME, DARK_THEME } from "../../../constants/themeConstants";

const TABLE_HEADS = [
  "Sr No",
  "Name",
  "Email Address",
  "Status",
  "Joined At ",
  "Action",
];

const AreaTable = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setTableData(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' });
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {loading ? (
        // Loading indicator
        <div role="status" className='flex justify-center items-center h-full'>
          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* SVG animation */}
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        // Table with data
        <section className="content-area-table">
            <div className="data-table-info">
            <h4 className="data-table-title">Users</h4>
          </div>
          <div className="data-table-diagram">
            <table>
              <thead>
                <tr>
                  {TABLE_HEADS?.map((th, index) => (
                    <th key={index}>{th}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentItems.map((dataItem, index) => (
                  <tr key={dataItem.id} className={dataItem.disabled ? "disabled-user" : ""}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td>{dataItem.name} {dataItem.disabled && <span style={{ color: 'white',fontSize: '17 px', }}> <b>(Disabled)</b></span>}</td> 
                    <td>{dataItem.email}</td>
                    <td>
                      <div className="dt-status">
                        <span className={`dt-status-dot dot-${dataItem.is_online ? 'delivered' : 'canceled'}`} />
                        <span className="dt-status-text">{dataItem.is_online ? 'Online' : 'Offline'}</span>
                      </div>
                    </td>
                    <td>{dataItem.created_at ? formatTimestamp(dataItem.created_at) : 'N/A'}</td>
                    <td className="dt-cell-action">
                      <AreaTableAction userData={dataItem} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
            {/* Show items range */}
            <span style={{ color: theme === DARK_THEME ? "white" : "black" }} className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
              Showing <span style={{ color: theme === DARK_THEME ? "white" : "black" }} className="font-semibold text-gray-900 dark:text-white">{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, tableData.length)}</span> of <span style={{ color: theme === DARK_THEME ? "white" : "black" }} className="font-semibold text-gray-900 dark:text-white">{tableData.length}</span>
            </span>

            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8 ">
              <li>
                <a
                  style={{
                    color: theme === DARK_THEME ? "white" : "black",
                    backgroundColor: theme === DARK_THEME ? "var(--secondary-color)" : "white",
                    pointerEvents: currentPage === 1 ? "none" : "auto",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer"
                  }}
                  href="#"
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => paginate(currentPage - 1)}
                >
                  Previous
                </a>
              </li>
              {Array.from({ length: Math.ceil(tableData.length / itemsPerPage) }, (_, i) => (
                <li key={i}>
                  <a
                    style={{
                      color: theme === DARK_THEME ? "white" : "black",
                      backgroundColor: theme === DARK_THEME ? "var(--secondary-color)" : "white"
                    }}
                    href="#"
                    className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === i + 1 ? 'text-black-600 bg-blue-50 hover:bg-blue-900' : ''}`}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </a>
                </li>
              ))}
              <li>
                <a
                  style={{
                    color: theme === DARK_THEME ? "white" : "black",
                    backgroundColor: theme === DARK_THEME ? "var(--secondary-color)" : "white",
                    pointerEvents: currentPage === Math.ceil(tableData.length / itemsPerPage) ? "none" : "auto",
                    cursor: currentPage === Math.ceil(tableData.length / itemsPerPage) ? "not-allowed" : "pointer"
                  }}
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => paginate(currentPage + 1)}
                >
                  Next
                </a>
              </li>
            </ul>

          </nav>

          
        </section>
      )}
    </div>
  );
};

export default AreaTable;
