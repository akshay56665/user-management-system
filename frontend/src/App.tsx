import Dashboard from "./dashboard/dashboard";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AddUser from "./dashboard/(components)/AddUser";
import EditUser from "./dashboard/(components)/EditUser";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/edituser/:userid" element={<EditUser />} />
      </Routes>
    </div>
  );
}

export default App;
