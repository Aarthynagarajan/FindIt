import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PostLost from "./pages/PostLost";
import PostFound from "./pages/PostFound";
import ViewLost from "./pages/ViewLost";
import ViewFound from "./pages/ViewFound";

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/post-lost" element={<PostLost/>}/>
        <Route path="/post-found" element={<PostFound/>}/>
        <Route path="/view-lost" element={<ViewLost/>}/>
        <Route path="/view-found" element={<ViewFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
