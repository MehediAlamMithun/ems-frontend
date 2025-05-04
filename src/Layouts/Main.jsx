import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";



const Main = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Navbar></Navbar>
      </div>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    <Footer></Footer>
    </div>
  );
};

export default Main;
