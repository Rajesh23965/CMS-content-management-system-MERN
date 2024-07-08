import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/getall");
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
    await axios
      .delete(`http://localhost:4000/api/delete/${userId}`)
      .then((response) => {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
        toast.success(response.data.msg, { position: "top-right" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="bg-blue-600 w-40 text-white m-4 py-2 hover:bg-red-600 text-center rounded-md cursor-pointer transition duration-300 delay-150 md:delay-300">
        <Link to="/signup">
          <button>Add User</button>
        </Link>
      </div>
      <div className="text-center font-bold bg-red-700 ml-4 mr-8 p-2 text-xl">
        <p>User Records</p>
      </div>
      <div className="overflow-x-auto overflow-y-auto h-[400px] m-2 p-2">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-gray-500 text-left">
              <th className="py-2 px-4">S.N</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">First Name</th>
              <th className="py-2 ">Last Name</th>
              <th className="py-2 px-4">Phone</th>
              {/* <th className="py-2 px-4">Photo</th> */}
              <th className="py-2 px-4">File Name</th>
              <th className="py-2 px-4">Company</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr className="border-b" key={index}>
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">
                  <a href="">{user.email}</a>
                </td>
                <td className="py-2 px-4">{user.firstName}</td>
                <td className="py-2 px-4">{user.lastName}</td>
                <td className="py-2 px-4">{user.phone}</td>
                {/*  <td className="py-2 px-4 ">
                  {user.file && (
                    <img
                      src={`http://localhost:4000/${user.file}`}
                      alt="User"
                      className="w-16 h-16 object-cover"
                    />
                  )}
                </td> */}
                <td className="py-2 px-4">
                  <a
                    href={`http://localhost:4000/${user.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View File
                  </a>
                </td>

                <td className="py-2 px-4">
                  <a href="" className="">
                    {user.company}
                  </a>
                </td>
                <td className="flex justify-around py-2 px-4">
                  <Link to={`/update/${user._id}`}>
                    <FaEdit className="text-green-500 h-5 w-10" />
                  </Link>
                  <button>
                    <MdDelete
                      className="text-red-500 h-5 w-10"
                      onClick={() => deleteUserRecord(user._id)}
                    />
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

export default UserDetails;
