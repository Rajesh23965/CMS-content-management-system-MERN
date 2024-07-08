import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import LogIn from "./components/LogIn";

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="flex">
        <div className="flex-grow">
          <Routes>
            <Route
              path="/login"
              element={<LogIn loading={loading} setLoading={setLoading} />}
            />
            <Route
              path="/*"
              element={
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
              }
            />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
