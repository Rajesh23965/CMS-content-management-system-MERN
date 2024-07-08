import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";

const MenuBar = ({ isOpen }) => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDoubleDropdownOpen, setIsDoubleDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleDoubleDropdown = () =>
    setIsDoubleDropdownOpen(!isDoubleDropdownOpen);

  return (
    <Link to="/dashboard">
      <div className="flex items-center justify-between border-b-2 border-[gray] mt-3 text-graylight">
        <div
          className={`md:w-auto ${isNavbarOpen ? "" : ""}`}
          id="navbar-multi-level"
        >
          <ul>
            <li>
              <div
                id="dropdownNavbarLink"
                data-dropdown-toggle="dropdownNavbar"
                className={`flex items-center cursor-pointer text-graylight ${
                  isOpen
                    ? "p-1 cursor-pointer hover:bg-[#b80f0f] w-16"
                    : "p-1 cursor-pointer hover:bg-[#ac0f0f] hover:scale-95 transition ease-in delay-150 rounded-lg"
                }`}
                onClick={toggleDropdown}
              >
                <MdDashboard
                  className={`${
                    isOpen ? "ml-3" : ""
                  } transition-all duration-300 text-2xl`}
                />

                {!isOpen && (
                  <span className="ml-2" title="profile">
                    Dropdown
                  </span>
                )}
                {!isOpen && (
                  <FaChevronDown className="text-gray-300 mt-0.5 ml-32" />
                )}
              </div>
              <div
                id="dropdownNavbar"
                className={`z-10 bg-green-500 ${
                  isDropdownOpen
                    ? ` ${
                        isOpen
                          ? " relative left-16 -mt-9 h-full"
                          : " m-2 right-0 "
                      } `
                    : "hidden"
                } font-normal bg-white divide-y divide-gray-100 mt-2 dark:bg-gray-700 dark:divide-gray-600`}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownLargeButton"
                >
                  <li className="flex justify-start">
                    <a
                      href="#"
                      className="w-full hover:bg-gray-300 text-[15px] p-2"
                    >
                      Dashboard
                    </a>
                  </li>

                  <li aria-labelledby="dropdownNavbarLink">
                    <div
                      id="doubleDropdownButton"
                      data-dropdown-toggle="doubleDropdown"
                      data-dropdown-placement="right-start"
                      type="button"
                      className="flex items-center justify-between w-full hover:bg-gray-300 text-[15px] p-2"
                      onClick={toggleDoubleDropdown}
                    >
                      Dropdown
                      <FaChevronDown className="text-green-900 mt-0.5" />
                    </div>
                    <div
                      id="doubleDropdown"
                      className={`z-10 ${
                        isDoubleDropdownOpen ? "" : "hidden"
                      } bg-white divide-y divide-gray-900 border-2 border-[hsl(0,9%,46%)] dark:bg-gray-900 shadow-xl`}
                    >
                      <ul
                        className="py-2 text-sm text-red-900 dark:text-gray-900"
                        aria-labelledby="doubleDropdownButton"
                      >
                        <li>
                          <a
                            href="#"
                            className="block w-full hover:bg-gray-300 text-[14px] p-2"
                          >
                            Overview
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block w-full hover:bg-gray-300 text-[14px] p-2"
                          >
                            My downloads
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block w-full hover:bg-gray-300 text-[15px] p-2"
                    >
                      Earnings
                    </a>
                  </li>
                </ul>
                <div className="py-1">
                  <a
                    href="#"
                    className="text-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white block w-full hover:bg-gray-300 text-[15px] p-2"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default MenuBar;
