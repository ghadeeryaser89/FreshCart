import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

function Layout() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto pt-5 p-3 max-w-screen-xl min-h-[60vh]">
        <Outlet />
      </main>
        <Footer />
    </>
  );
}

export default Layout;
