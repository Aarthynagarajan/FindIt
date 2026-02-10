import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function Login(){

  const [registerNo,setRegisterNo] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");

  const handleLogin = async ()=>{

    if(!registerNo || !password){
      setError("Enter register number and password");
      return;
    }

    try{
      const res = await axios.post("http://localhost:5000/api/login",{
        registerNo,
        password
      });

      if(res.data.message==="Login successful"){
        localStorage.setItem("user",JSON.stringify(res.data.user));
        window.location.href="/dashboard";
      }
      else{
        setError("Invalid register number or password");
      }
    }
    catch(err){
      setError("Server error");
    }
  }

  return(
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">

      {/* background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#020617] to-indigo-900"></div>

      <div className="absolute w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[150px] opacity-20 top-[-100px] left-[-100px]"></div>
      <div className="absolute w-[500px] h-[500px] bg-purple-600 rounded-full blur-[150px] opacity-20 bottom-[-100px] right-[-100px]"></div>

      {/* login card */}
      <motion.div
        initial={{opacity:0,scale:0.9}}
        animate={{opacity:1,scale:1}}
        transition={{duration:0.5}}
        className="relative backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl p-10 w-[420px]"
      >

        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Campus Lost & Found
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Student Login Portal
        </p>

        {/* IMPORTANT: autocomplete off */}
        <form autoComplete="off">

          <div className="mb-5">
            <label className="text-sm text-gray-400">Register Number</label>
            <input
              autoComplete="off"
              type="text"
              value={registerNo}
              placeholder="Enter register number"
              className="w-full mt-2 p-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500"
              onChange={(e)=>setRegisterNo(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="text-sm text-gray-400">Password</label>
            <input
              autoComplete="new-password"
              type="password"
              value={password}
              placeholder="Enter password"
              className="w-full mt-2 p-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

        </form>

        <button
          onClick={handleLogin}
          className="w-full p-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105 transition shadow-lg"
        >
          Login
        </button>

        {error && (
          <p className="text-red-400 text-sm mt-4 text-center">{error}</p>
        )}

        <p className="text-center text-gray-400 mt-6">
          Don't have account?{" "}
          <span
          onClick={()=>window.location.href="/signup"}
          className="text-indigo-400 cursor-pointer">
          Sign up
          </span>
        </p>

      </motion.div>
    </div>
  )
}

export default Login;
