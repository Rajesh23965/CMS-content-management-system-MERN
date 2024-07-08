import React from "react";
import { Routes, Route } from "react-router-dom";
import StudentRecord from "./StudentRecord";
import Profile from "./Profile";
import Info from "./Info";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import UpdateForm from "./UpdationForm";
import StudentForm from "./StudentForm";
import UserDetails from "./UserDetails";
import { IoMenu } from "react-icons/io5";
import Ranjit from "../assets/ranjit.png";

const MainContent = ({ toggleSidebar }) => {
  return (
    <div className="flex flex-col items-center h-screen max-w-auto">
      <div className="flex items-center border-b-2 border-[gray] bg-gray-dark justify-between w-full">
        <IoMenu
          className="text-3xl ml-2 cursor-pointer text-graylight"
          onClick={toggleSidebar}
        />
        <p className="text-graylight text-2xl -ml-[40rem]">
          Content Management System
        </p>
        <div className="hidden lg:block">
          <img
            src={Ranjit}
            alt="Image not found"
            className="w-16 h-16 p-1 rounded-full"
          />
        </div>
      </div>
      <div className="flex-grow w-full">
        <Routes>
          <Route path="/home" element={<StudentRecord />} />
          <Route path="/form" element={<StudentForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/info" element={<Info />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/update/:id" element={<UpdateForm />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/user" element={<UserDetails />} />
          <Route
            path="/"
            element={
              <div>
                <p className="text-2xl mt-5 font-bold text-center bg-red-100 ml-2 mr-2 text-[green]">
                  Welcome to content management system
                </p>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default MainContent;
