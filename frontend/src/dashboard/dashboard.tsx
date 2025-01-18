import Sidebar from "./(components)/SideBar";
import UserNode from "./(components)/UserNode";

function Dashboard() {
  return (
    <div className="min-h-screen p-3 flex flex-col md:flex-row ">
      <div className=" md:w-1/4">
        <Sidebar />
      </div>
      <div className="md:w-3/4">
        <UserNode />
      </div>
    </div>
  );
}

export default Dashboard;
