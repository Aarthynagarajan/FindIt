
import { useState } from "react";
import axios from "axios";

function PostFound(){

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
      await axios.post("http://localhost:5000/api/items/found",data);
      setMsg("Found item posted successfully");

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

        <h1 className="text-3xl font-bold mb-2 text-purple-400">
          Report Found Item
        </h1>
        <p className="text-gray-400 mb-8">
          Help return item to owner
        </p>

        <div className="bg-[#0f172a] p-8 rounded-2xl border border-gray-800 shadow-xl">

          {/* item name */}
          <label className="text-gray-400 text-sm">Item Name</label>
          <input
          value={form.itemName}
          placeholder="Ex: Blue water bottle"
          className="w-full p-3 mb-4 mt-1 bg-[#020617] border border-gray-700 rounded-lg focus:border-purple-500 outline-none"
          onChange={(e)=>setForm({...form,itemName:e.target.value})}
          />

          {/* description */}
          <label className="text-gray-400 text-sm">Description</label>
          <textarea
          value={form.description}
          placeholder="Describe item..."
          className="w-full p-3 mb-4 mt-1 bg-[#020617] border border-gray-700 rounded-lg focus:border-purple-500 outline-none"
          onChange={(e)=>setForm({...form,description:e.target.value})}
          />

          {/* location */}
          <label className="text-gray-400 text-sm">Found Location</label>
          <input
          value={form.location}
          placeholder="Library / Bus stop"
          className="w-full p-3 mb-4 mt-1 bg-[#020617] border border-gray-700 rounded-lg focus:border-purple-500 outline-none"
          onChange={(e)=>setForm({...form,location:e.target.value})}
          />

          {/* date */}
          <label className="text-gray-400 text-sm">Date Found</label>
          <input
          type="date"
          value={form.date}
          className="w-full p-3 mb-6 mt-1 bg-[#020617] border border-gray-700 rounded-lg focus:border-purple-500 outline-none"
          onChange={(e)=>setForm({...form,date:e.target.value})}
          />

          {/* button */}
          <button
          onClick={submit}
          className="w-full p-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-[1.02] transition shadow-lg">
          Submit Found Item
          </button>

          {/* message */}
          {msg && (
            <p className="text-center mt-4 text-purple-400">{msg}</p>
          )}

        </div>
      </div>
    </div>
  )
}

export default PostFound;
