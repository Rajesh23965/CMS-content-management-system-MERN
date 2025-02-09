import React from "react";

const PopupModule = ({ handleDownloadFile, user }) => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Download
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  {/* <h3 className="text-3xl font-semibold">Files</h3> */}
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-2 flex-auto">
                  <table className="min-w-full bg-white border-2 border-back">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-r-2 border-b-2 border-black ">
                          S.N.
                        </th>
                        <th className="py-2 px-4 border-r-2 border-b-2 border-black ">
                          File Name
                        </th>
                        <th className="py-2 px-4 border-r-2 border-b-2 border-black ">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.avatar.map((file, fileIndex) => (
                        <tr key={fileIndex}>
                          <td className="py-2 px-4 border-r-2 border-b-2 border-black ">
                            {fileIndex + 1}
                          </td>
                          <td className="py-2 px-4 border-r-2 border-b-2 border-black ">
                            {file.split("||||")[0]}
                          </td>
                          <td className="py-2 px-4 border-r-2 border-b-2 border-black ">
                            <button
                              onClick={() => handleDownloadFile(file)}
                              className="text-blue-500 hover:underline"
                            >
                              Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/*  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div> */}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default PopupModule;
