import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const UserForm = ({ isOpen }) => {
  return (
    <Link to="/user">
      <li
        className={`flex items-center border-b-2 border-[gray] mt-3 text-graylight ${
          isOpen
            ? "p-1 cursor-pointer hover:bg-[#b80f0f]"
            : "p-1 cursor-pointer hover:bg-[#ac0f0f] transition ease-in delay-150 hover:scale-95 duration-300 rounded-lg"
        }`}
      >
        <FaUser
          className={`${
            isOpen ? " ml-3" : ""
          } transition-all duration-300 text-2xl`}
        />
        {!isOpen && (
          <span className="ml-2" title="profile">
            User
          </span>
        )}
      </li>
    </Link>
  );
};

export default UserForm;
