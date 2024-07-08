import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import PopupModule from "./PopupModule";

const StudentRecord = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/getall");
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (users.length === 0) {
    return <div>No data found</div>;
  }

  const deleteUserRecord = async (userId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/delete/${userId}`
      );
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      toast.success(response.data.msg, { position: "top-right" });
    } catch (error) {
      console.error("Error deleting user record:", error);
      toast.error("Failed to delete user record", { position: "top-right" });
    }
  };

  const handleViewFiles = (files) => {
    if (files && files.length > 0) {
      files.forEach((file) => {
        window.open(`http://localhost:5000/${file}`, "_blank");
      });
    } else {
      console.log("No files to display");
    }
  };

  const handleDownloadFile = (file) => {
    const link = document.createElement("a");
    link.href = (`http://localhost:5000/${file}`, "_blank");
    // window.link.open(`http:localhost:5000/${file}`, "_blank");
    link.download = file.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="bg-blue-600 w-40 text-white m-4 py-2 hover:bg-red-600 text-center rounded-md cursor-pointer transition duration-300 delay-150 md:delay-300">
        <Link to="/form">
          <button>Add Student</button>
        </Link>
      </div>

      <div className="text-center font-bold bg-red-700 ml-4 mr-8 p-2 text-xl">
        <p>Student Records</p>
      </div>

      <div className="overflow-x-auto overflow-y-auto h-[400px] m-2 p-2 ">
        <table className="min-w-full bg-white ">
          <thead>
            <tr className="w-full bg-gray-500 text-left">
              <th className="py-2 px-4">S.N</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Files</th>
              <th className="py px-4">Download</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr className="border-b" key={user._id}>
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleViewFiles(user.avatar)}
                    className="text-blue-500 hover:underline"
                  >
                    View Files
                  </button>
                </td>
                <td className="py-2 px-4">
                  <PopupModule
                    handleDownloadFile={handleDownloadFile}
                    user={user}
                  />
                </td>
                <td className="flex justify-start py-2 px-4">
                  {/* <Link to={`/update/${user._id}`}>
                    <FaEdit className="text-green-500 h-5 w-10" />
                  </Link> */}
                  <button onClick={() => deleteUserRecord(user._id)}>
                    <MdDelete className="text-red-500 h-5 w-10" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentRecord;
