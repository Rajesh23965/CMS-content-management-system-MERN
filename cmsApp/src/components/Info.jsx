const Info = () => {
  return (
    <div>
      <h1 className="text-center mt-4 text-gray-dark bg-[red] p-2 ml-2 mr-2 text-xl font-bold">
        Contact Information
      </h1>
      <div className=" flex justify-around  ">
        <div className="space-y-2">
          <p className=" underline  underline-offset-12 p-4 decoration-[red]    border-[gray] text-center text-[blue] text-xl w-full">
            Temporary Address
          </p>
          <div className="text-[#020202]  ">
            <p>Old Baneshwor-10, Kathmandu, Nepal</p>
          </div>
        </div>
        <div className="">
          <p className=" underline  underline-offset-12 p-4 decoration-[red]    border-[gray] text-center text-[blue] text-xl w-full">
            Parmanent Address
          </p>
          <div className="text-[#020202]  ">
            <p>Gaushala-09,Mahotari, Nepal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
