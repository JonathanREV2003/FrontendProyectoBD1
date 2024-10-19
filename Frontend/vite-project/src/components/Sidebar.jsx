import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Icons
import {
  RiHome3Line,
  RiFileCopyLine,
  RiWalletLine,
  RiPieChartLine,
  RiMore2Fill,
  RiCloseFill,
} from "react-icons/ri";

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  return (
    <>
        <div
          className={`bg-primary-900 h-[80vh] fixed top-0 lg:static lg:h-auto w-[80%] md:w-[40%] lg:w-80 transition-all z-50 duration-300 ${
            showMenu ? "left-0" : "-left-full"
          } overflow-y-auto`} // Clase que permite el scroll independiente
        >
        {/* Profile */}
        <div className="flex flex-col items-center justify-center p-8 gap-2 h-[30vh]">
          <img
            src="https://img.freepik.com/vector-gratis/circulo-azul-usuario-blanco_78370-4707.jpg"
            className="w-20 h-20 object-cover rounded-full ring-2 ring-gray-300"
          />
          <h1 className="text-xl text-white font-bold">Jonathan jasinto Elías</h1>
          <p className="bg-primary-100 py-2 px-4 rounded-full text-white">
          administrator console
          </p>
        </div>
        {/* Nav */}
        <div className="bg-primary-300 p-8 rounded-tr-[100px] overflow-y-auto flex flex-col justify-between gap-8 h-[calc(100vh-30vh)]">
          <nav className="flex flex-col gap-8">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
            >
              <RiHome3Line /> Home
            </button>
            <button
              onClick={() => navigate("/agendarcita/detallecita")}
              className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
            >
              <RiFileCopyLine /> Pet card
            </button>
  
            <button
              onClick={() => navigate("/Reporte")}
              className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
            >
              <RiPieChartLine /> Reports
            </button>
          </nav>
          <div className="bg-primary-900/50 text-white p-4 rounded-xl">
            <p className="text-gray-400">Having troubles?</p>
            <a href="#">Contact group BD1</a>
          </div>
        </div>
      </div>
      {/* Button mobile */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="lg:hidden fixed right-4 bottom-4 text-2xl bg-primary-900 p-2.5 rounded-full text-white z-50"
      >
        {showMenu ? <RiCloseFill /> : <RiMore2Fill />}
      </button>
    </>
  );
};

export default Sidebar;