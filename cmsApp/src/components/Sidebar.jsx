import React from "react";
import Ranjit from "../assets/ranjit.png";
import { TiHomeOutline } from "react-icons/ti";
import { CgProfile } from "react-icons/cg";
import { FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import MainContent from "./MainContent";
import MenuBar from "./MenuBar";
import UserForm from "./UserForm";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className="flex h-screen">
      <div
        className={`bg-gray-dark ${
          isOpen ? "w-16" : "w-64"
        } transition-width duration-300 ease-in-out`}
      >
        <ul>
          <li className="flex items-center cursor-pointer bg-gray-700 text-center">
            <Link to="/dashboard">
              <img
                src={Ranjit}
                alt="Image not found"
                className={`${
                  isOpen ? "w-10 h-10 ml-2" : "w-14 ml-2 h-14"
                } rounded-full`}
              />
            </Link>
            {!isOpen && (
              <span className="p-5 text-[#f6f6fa]">Ranjit Kumar Yadav</span>
            )}
          </li>
          <Link to="/home">
            <li className="flex items-center border-b-2 border-[gray] text-graylight mt-3 p-1 cursor-pointer hover:bg-[#b80f0f] transition ease-in delay-150 hover:scale-95 duration-300 rounded-lg">
              <TiHomeOutline className={`text-2xl ${isOpen ? "ml-3" : ""}`} />
              {!isOpen && (
                <span className="ml-2" title="home">
                  Home
                </span>
              )}
            </li>
          </Link>
          <Link to="/profile">
            <li className="flex items-center border-b-2 border-[gray] mt-3 text-graylight p-1 cursor-pointer hover:bg-[#b80f0f] transition ease-in delay-150 hover:scale-95 duration-300 rounded-lg">
              <CgProfile className={`text-2xl ${isOpen ? "ml-3" : ""}`} />
              {!isOpen && (
                <span className="ml-2" title="profile">
                  Profile
                </span>
              )}
            </li>
          </Link>
          <Link to="/info">
            <li className="flex items-center border-b-2 border-[gray] mt-3 text-graylight p-1 cursor-pointer hover:bg-[#b80f0f] transition ease-in delay-150 hover:scale-95 duration-300 rounded-lg">
              <FaInfoCircle className={`text-2xl ${isOpen ? "ml-3" : ""}`} />
              {!isOpen && (
                <span className="ml-2" title="info">
                  Info
                </span>
              )}
            </li>
          </Link>
          <div>
            <MenuBar isOpen={isOpen} />
          </div>
          <div>
            <UserForm isOpen={isOpen} />
          </div>
          <Link to="/login">
            <li className="flex items-center border-b-2 border-[gray] mt-3 text-graylight p-1 cursor-pointer hover:bg-[#b80f0f] transition ease-in delay-150 hover:scale-95 duration-300 rounded-lg">
              <IoIosLogOut className={`text-2xl ${isOpen ? "ml-3" : ""}`} />
              {!isOpen && (
                <span className="ml-2" title="logout">
                  Logout
                </span>
              )}
            </li>
          </Link>
        </ul>
      </div>
      <div className="flex-grow">
        <MainContent toggleSidebar={toggleSidebar} />
      </div>
    </div>
  );
};

export default Sidebar;
