import { Outlet } from "react-router-dom";
import { AreaCards, AreaCharts, AreaTable, AreaTop } from "../../components";
import { Routes, Route, Link } from "react-router-dom";
import Edituser from "../edit/edit";
const Dashboard = ({userData}) => {
  return (
  
    <div className="content-area">
      <AreaTop />
      <AreaCards />
      {/* <AreaCharts /> */}
      
      <AreaTable />

     
    </div>
  );
};

export default Dashboard;
