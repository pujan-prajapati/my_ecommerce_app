import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../../components/home";

export const HomeLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
