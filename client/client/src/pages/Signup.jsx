import { useState } from "react";
import axios from "axios";

function Signup(){

  const [form,setForm] = useState({
    name:"",
    registerNo:"",
    department:"",
    year:"",
    phone:"",
    password:""
  });

  const [msg,setMsg] = useState("");

  const register = async ()=>{

    if(!form.name || !form.registerNo || !form.department || !form.year || !form.phone || !form.password){
      setMsg("Please fill all fields");
      return;
    }

    if(form.password.length < 4){
      setMsg("Password must be minimum 4 characters");
      return;
    }

    try{
      const res = await axios.post("/api/signup",form);
      setMsg(res.data.message);

      if(res.data.message==="Signup successful"){
        setForm({
          name:"",
          registerNo:"",
          department:"",
          year:"",
          phone:"",
          password:""
        });
      }
    }catch(err){
      console.log(err);
      setMsg("Server error. Try again.");
    }
  }

  return(
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">

      <div className="bg-[#0f172a] p-10 rounded-2xl w-[420px] border border-gray-800 shadow-xl">

        <h1 className="text-3xl font-bold text-indigo-400 mb-6 text-center">
          Student Signup
        </h1>

        <form autoComplete="off">

          <input value={form.name}
          placeholder="Name"
          className="w-full p-3 mb-3 bg-[#020617] border border-gray-700 rounded"
          onChange={(e)=>setForm({...form,name:e.target.value})}/>

          <input value={form.registerNo}
          placeholder="Register Number"
          className="w-full p-3 mb-3 bg-[#020617] border border-gray-700 rounded"
          onChange={(e)=>setForm({...form,registerNo:e.target.value})}/>

          <input value={form.department}
          placeholder="Department"
          className="w-full p-3 mb-3 bg-[#020617] border border-gray-700 rounded"
          onChange={(e)=>setForm({...form,department:e.target.value})}/>

          <input value={form.year}
          placeholder="Year"
          className="w-full p-3 mb-3 bg-[#020617] border border-gray-700 rounded"
          onChange={(e)=>setForm({...form,year:e.target.value})}/>

          <input value={form.phone}
          placeholder="Phone"
          className="w-full p-3 mb-3 bg-[#020617] border border-gray-700 rounded"
          onChange={(e)=>setForm({...form,phone:e.target.value})}/>

          <input value={form.password}
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 bg-[#020617] border border-gray-700 rounded"
          onChange={(e)=>setForm({...form,password:e.target.value})}/>

        </form>

        <button
        onClick={register}
        className="w-full p-3 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition">
        Create Account
        </button>

        {msg && <p className="text-center mt-4 text-red-400">{msg}</p>}

        <p className="text-center text-gray-400 mt-6">
          Already have account?{" "}
          <span
          onClick={()=>window.location.href="/"}
          className="text-indigo-400 cursor-pointer">
          Login
          </span>
        </p>

      </div>
    </div>
  )
}

export default Signup;
