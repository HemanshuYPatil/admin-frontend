import { AreaCharts } from "../../components";
import Ordercard from "../../components/dashboard/areaCards/ordercard";
import AreaBarChart from "../../components/dashboard/areaCharts/AreaBarChart";
import ChartComponent from "../../components/dashboard/areaCharts/apexchart";
import Order from "./table";

const OrderScreen = () => {
    return (

        <section className="content-area-top" style={{ width: '100%', height: '600px' }}>
            <Ordercard />
            <ChartComponent />
          
        </section>
    );
};

export default OrderScreen;