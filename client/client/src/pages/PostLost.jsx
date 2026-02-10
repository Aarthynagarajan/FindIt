
import { useState } from "react";
import axios from "axios";

function PostLost(){

  const user = JSON.parse(localStorage.getItem("user"));

  const [form,setForm] = useState({
    itemName:"",
    description:"",
    location:"",
    date:""
  });

  const [msg,setMsg] = useState("");

  if(!user){
    window.location.href="/";
  }

  const submit = async ()=>{

    if(!form.itemName || !form.description || !form.location || !form.date){
      setMsg("Please fill all fields");
      return;
    }

    const data = {
      ...form,
      studentName:user.name,
      registerNo:user.registerNo,
      department:user.department,
      year:user.year,
      phone:user.phone
    };

    try{
      await axios.post("/api/items/lost",data);
      setMsg("Lost item posted successfully");

      setForm({
        itemName:"",
        description:"",
        location:"",
        date:""
      });

    }catch{
      setMsg("Error posting item");
    }
  }

  return(
    <div className="min-h-screen bg-[#020617] text-white flex justify-center pt-16">

      <div className="w-[500px]">

        <h1 className="text-3xl font-bold mb-2 text-indigo-400">
          Report Lost Item
        </h1>
        <p className="text-gray-400 mb-8">
          Fill details of the lost item
        </p>

        <div className="bg-[#0f172a] p-8 rounded-2xl border border-gray-800 shadow-xl">

          {/* item name */}
          <label className="text-gray-400 text-sm">Item Name</label>
          <input
          value={form.itemName}
          placeholder="Ex: Black wallet"
          className="w-full p-3 mb-4 mt-1 bg-[#020617] border border-gray-700 rounded-lg focus:border-indigo-500 outline-none"
          onChange={(e)=>setForm({...form,itemName:e.target.value})}
          />

          {/* description */}
          <label className="text-gray-400 text-sm">Description</label>
          <textarea
          value={form.description}
          placeholder="Describe item..."
          className="w-full p-3 mb-4 mt-1 bg-[#020617] border border-gray-700 rounded-lg focus:border-indigo-500 outline-none"
          onChange={(e)=>setForm({...form,description:e.target.value})}
          />

          {/* location */}
          <label className="text-gray-400 text-sm">Last Seen Location</label>
          <input
          value={form.location}
          placeholder="Library / Canteen"
          className="w-full p-3 mb-4 mt-1 bg-[#020617] border border-gray-700 rounded-lg focus:border-indigo-500 outline-none"
          onChange={(e)=>setForm({...form,location:e.target.value})}
          />

          {/* date */}
          <label className="text-gray-400 text-sm">Date Lost</label>
          <input
          type="date"
          value={form.date}
          className="w-full p-3 mb-6 mt-1 bg-[#020617] border border-gray-700 rounded-lg focus:border-indigo-500 outline-none"
          onChange={(e)=>setForm({...form,date:e.target.value})}
          />

          {/* button */}
          <button
          onClick={submit}
          className="w-full p-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.02] transition shadow-lg">
          Submit Lost Item
          </button>

          {/* message */}
          {msg && (
            <p className="text-center mt-4 text-indigo-400">{msg}</p>
          )}

        </div>
      </div>
    </div>
  )
}

export default PostLost;
