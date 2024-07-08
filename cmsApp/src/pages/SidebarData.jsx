const SidebarData = () => {
  return (
    <div className="w-64 h-screen bg-gray-dark text-white flex flex-col">
      <div className="p-4 border-b border-[gray]">
        <h1 className="text-xl font-bold">CoreUI</h1>
      </div>
      <nav className="flex-grow p-4">
        <h2 className="text-gray mb-2">Nav Title</h2>
        <a href="#" className="block p-2 mb-2 text-gray hover:bg-gray rounded">
          <span className="flex items-center">
            <span className="material-icons">speed</span>
            <span className="ml-2">Nav item</span>
          </span>
        </a>
        <a href="#" className="block p-2 mb-2 text-gray hover:bg-gray rounded">
          <span className="flex items-center">
            <span className="material-icons">speed</span>
            <span className="ml-2">With badge</span>
            <span className="ml-auto bg-blue text-white px-2 py-1 text-xs rounded">
              NEW
            </span>
          </span>
        </a>
        <div className="mb-2">
          <button className="w-full text-left p-2 text-gray hover:bg-gray rounded">
            <span className="flex items-center">
              <span className="material-icons">puzzle</span>
              <span className="ml-2">Nav dropdown</span>
            </span>
          </button>
          <div className="ml-6">
            <a href="#" className="block p-2 text-gray hover:bg-gray rounded">
              Nav dropdown item
            </a>
            <a href="#" className="block p-2 text-gray hover:bg-gray rounded">
              Nav dropdown item
            </a>
          </div>
        </div>
        <a
          href="https://coreui.io"
          className="block p-2 mb-2 text-gray hover:bg-gray rounded"
        >
          <span className="flex items-center">
            <span className="material-icons">cloud_download</span>
            <span className="ml-2">Download CoreUI</span>
          </span>
        </a>
        <a
          href="https://coreui.io/pro/"
          className="block p-2 text-gray hover:bg-gray rounded"
        >
          <span className="flex items-center">
            <span className="material-icons">layers</span>
            <span className="ml-2">Try CoreUI PRO</span>
          </span>
        </a>
      </nav>
    </div>
  );
};

export default SidebarData;
