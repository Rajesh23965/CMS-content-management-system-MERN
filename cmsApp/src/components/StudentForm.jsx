import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const StudentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    college: "",
    files: [],
  });
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [filePreviews, setFilePreviews] = useState([]);
  useEffect(() => {
    if (!formData.files.length) {
      setFilePreviews([]);
      return;
    }

    const previews = Array.from(formData.files).map((file) => {
      const url = URL.createObjectURL(file);
      return { url, type: file.type };
    });

    setFilePreviews(previews);

    // Clean up object URLs on unmount
    return () =>
      previews.forEach((preview) => URL.revokeObjectURL(preview.url));
  }, [formData.files]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      files: e.target.files,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("age", formData.age);
    data.append("college", formData.college);

    for (let i = 0; i < formData.files.length; i++) {
      data.append("files", formData.files[i]);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/create",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/home");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setError(error.response ? error.response.data : "Server error");
    }
  };

  const renderFilePreview = (file) => {
    if (file.type.startsWith("image/")) {
      return (
        <img src={file.url} alt="Preview" className="w-24 h-24 object-cover" />
      );
    } else if (file.type === "application/pdf") {
      return (
        <embed
          src={file.url}
          type="application/pdf"
          width="100px"
          height="100px"
        />
      );
    } else if (file.type.startsWith("video/")) {
      return (
        <video width="100" height="100" controls>
          <source src={file.url} type={file.type} />
          Your browser does not support the video tag.
        </video>
      );
    } else if (file.type.startsWith("text/")) {
      return (
        <iframe src={file.url} title="text preview" width="100" height="100" />
      );
    } else {
      return <p>File type not supported for preview</p>;
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-6 space-y-1.5 shadow-2xl px-6 py-2 bg-graylight ">
      <form
        className="max-w-md mx-auto mt-6 space-y-1.5  "
        action="upload"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={formData.name}
            onChange={handleChange}
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 mt-4 group">
          <input
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={formData.email}
            onChange={handleChange}
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={formData.phone}
            onChange={handleChange}
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="age"
            id="age"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={formData.age}
            onChange={handleChange}
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Age
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="college"
            id="college"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={formData.college}
            onChange={handleChange}
          />
          <label
            htmlFor="college"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            College
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="user_avatar_help"
            id="user_files"
            type="file"
            name="files"
            multiple
            onChange={handleFileChange}
          />
        </div>
        {/* <div className="flex flex-wrap gap-4 mb-5">
          {filePreviews.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Preview ${index}`}
              className="w-24 h-24 object-cover"
            />
          ))}
        </div> */}
        <div className="flex flex-wrap gap-4 mb-5">
          {filePreviews.map((file, index) => (
            <div key={index} className="w-24 h-24 object-cover">
              {renderFilePreview(file)}
            </div>
          ))}
        </div>

        <div className="">
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Link to="/home">Upload</Link>
          </button>
          {error && (
            <p style={{ color: "red" }}>
              {typeof error === "string" ? error : JSON.stringify(error)}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
