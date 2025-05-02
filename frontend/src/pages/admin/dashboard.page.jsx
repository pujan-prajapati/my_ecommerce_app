import { useEffect } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa"; // Import the icons
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { getSales, getStats } from "../../redux/features/stats/stats.service";
import { selectStats } from "../../redux/features/stats/stats.slice";

export const Dashboard = () => {
  const dispatch = useDispatch();

  const { isLoading, salesData, isError, errorMsg, stats } =
    useSelector(selectStats);

  useEffect(() => {
    dispatch(getStats());
    dispatch(getSales());
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-red-500">{errorMsg}</p>;

  return (
    <>
      <h1 className="text-3xl font-bold mb-7">Dashboard</h1>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-500 shadow-md w-full h-52 rounded-lg flex flex-col items-center justify-center text-white">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-4xl font-bold">{stats.totalUsers}</p>
          <p className="text-sm">New: {stats.newUsers}</p>
        </div>

        <div className="bg-green-500 shadow-md w-full h-52 rounded-lg flex flex-col items-center justify-center text-white">
          <h2 className="text-xl font-semibold">Total Sales</h2>
          <p className="text-4xl font-bold">${stats.totalSales}</p>
          <p className="text-sm">This Month</p>
        </div>

        <div className="bg-yellow-500 shadow-md w-full h-52 rounded-lg flex flex-col items-center justify-center text-white">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-4xl font-bold">{stats.totalOrders}</p>
          <p className="text-sm">Pending: {stats.pendingOrders}</p>
        </div>

        <div className="bg-red-500 shadow-md w-full h-52 rounded-lg flex flex-col items-center justify-center text-white">
          <h2 className="text-xl font-semibold">Total Products</h2>
          <p className="text-4xl font-bold">{stats.totalProducts}</p>
          <p className="text-sm">Out of Stock: {stats.outOfStockProducts}</p>
        </div>
      </section>

      {/* Sales Graph */}
      <section className="mt-10 bg-gray-100 p-5 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-5">Monthly Sales Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </section>

      {/* Social Media Links */}
      <section className="mt-10 flex justify-center gap-5">
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 p-4 rounded-full text-white hover:bg-blue-700"
        >
          <FaFacebookF size={30} />
        </a>
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="bg-pink-600 p-4 rounded-full text-white hover:bg-pink-700"
        >
          <FaInstagram size={30} />
        </a>
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-800 p-4 rounded-full text-white hover:bg-blue-900"
        >
          <FaLinkedinIn size={30} />
        </a>
      </section>
    </>
  );
};
