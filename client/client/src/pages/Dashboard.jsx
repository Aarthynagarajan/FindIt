import { useEffect, useState } from "react";
import axios from "axios";
import { data } from "react-router-dom";

function Dashboard(){

  const user = JSON.parse(localStorage.getItem("user"));
  const [lostCount,setLostCount] = useState(0);
  const [foundCount,setFoundCount] = useState(0);
  const [recent,setRecent] = useState([]);

  useEffect(()=>{
    if(!user){
      window.location.href="/";
    }
    fetchData();
  },[]);

  const fetchData = async ()=>{
  const lost = await axios.get("/api/items/lost",data);
  const found = await axios.get("/api/items/found",data);


    setLostCount(lost.data.length);
    setFoundCount(found.data.length);

    const combined = [...lost.data,...found.data];
    setRecent(combined.slice(-5).reverse());
  }

  const logout = ()=>{
    localStorage.removeItem("user");
    window.location.href="/";
  }

  return(
    <div className="min-h-screen flex bg-[#020617] text-white">

      {/* SIDEBAR */}
      <div className="w-64 bg-[#020617] border-r border-gray-800 p-6">

        <h1 className="text-2xl font-bold text-indigo-400 mb-10">
          Campus Portal
        </h1>

        <div className="space-y-3">

          <div onClick={()=>window.location.href="/dashboard"}
            className="p-3 rounded-lg hover:bg-indigo-600/20 cursor-pointer">
            Dashboard
          </div>

          <div onClick={()=>window.location.href="/post-lost"}
            className="p-3 rounded-lg hover:bg-indigo-600/20 cursor-pointer">
            Post Lost Item
          </div>

          <div onClick={()=>window.location.href="/post-found"}
            className="p-3 rounded-lg hover:bg-indigo-600/20 cursor-pointer">
            Post Found Item
          </div>

          <div onClick={()=>window.location.href="/view-lost"}
            className="p-3 rounded-lg hover:bg-indigo-600/20 cursor-pointer">
            View Lost Items
          </div>

          <div onClick={()=>window.location.href="/view-found"}
            className="p-3 rounded-lg hover:bg-indigo-600/20 cursor-pointer">
            View Found Items
          </div>

        </div>

        <button onClick={logout}
        className="mt-10 text-red-400">
        Logout
        </button>

      </div>

      {/* MAIN DASHBOARD */}
      <div className="flex-1 p-10">

        {/* top */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome, {user?.name}
            </h1>
            <p className="text-gray-400">
              {user?.department} | Year {user?.year}
            </p>
          </div>
        </div>

        {/* stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">

          <div className="bg-indigo-600/20 p-6 rounded-xl">
            <p>Total Lost Items</p>
            <h2 className="text-4xl">{lostCount}</h2>
          </div>

          <div className="bg-purple-600/20 p-6 rounded-xl">
            <p>Total Found Items</p>
            <h2 className="text-4xl">{foundCount}</h2>
          </div>

          <div className="bg-slate-700/30 p-6 rounded-xl">
            <p>Your Register No</p>
            <h2 className="text-xl">{user?.registerNo}</h2>
          </div>

        </div>

        {/* recent */}
        <h2 className="text-2xl mb-6">Recent Activity</h2>

        <div className="grid md:grid-cols-3 gap-6">

          {recent.map((item,index)=>(
            <div key={index}
            className="bg-[#0f172a] p-5 rounded-xl border border-gray-800">

              <h3>{item.itemName}</h3>
              <p className="text-gray-400 text-sm">{item.description}</p>
              <p className="text-indigo-400 text-sm mt-2">
                {item.studentName}
              </p>

            </div>
          ))}

        </div>

      </div>
    </div>
  )
}

export default Dashboard;
