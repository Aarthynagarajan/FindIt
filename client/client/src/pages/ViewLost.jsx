
import { useEffect,useState } from "react";
import axios from "axios";

function ViewLost(){

  const [items,setItems] = useState([]);
  const [selected,setSelected] = useState(null); // popup state

  useEffect(()=>{
    fetchItems();
  },[]);

  const fetchItems = async ()=>{
    try{
      const res = await axios.get("/api/items/lost");
      setItems(res.data);
    }catch{
      console.log("error fetching");
    }
  }

  return(
    <div className="min-h-screen bg-[#020617] text-white p-10">

      <h1 className="text-3xl font-bold mb-8">Lost Items</h1>

      {/* cards */}
      <div className="grid md:grid-cols-3 gap-8">

        {items.map((item,index)=>(

          <div key={index}
          className="bg-[#0f172a] border border-gray-800 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition">

            <div className="h-40 bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-3xl">
              📦
            </div>

            <div className="p-5">

              <h2 className="text-xl font-semibold">{item.itemName}</h2>
              <p className="text-gray-400 text-sm">{item.description}</p>

              <p className="text-sm mt-2">📍 {item.location}</p>
              <p className="text-sm">📅 {item.date}</p>

              <p className="text-indigo-400 mt-3">{item.studentName}</p>

              <button
              onClick={()=>setSelected(item)}
              className="w-full mt-4 p-2 bg-indigo-600 rounded-lg hover:bg-indigo-700">
              I Found This
              </button>

            </div>
          </div>

        ))}

      </div>

      {/* POPUP MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">

          <div className="bg-[#0f172a] p-8 rounded-2xl w-[350px] text-center border border-gray-700">

            <h2 className="text-2xl font-bold mb-4 text-indigo-400">
              Contact Owner
            </h2>

            <p className="mb-2">{selected.studentName}</p>
            <p className="mb-2">{selected.department}</p>
            <p className="mb-4 text-lg">📞 {selected.phone}</p>

            <button
            onClick={()=>setSelected(null)}
            className="px-6 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700">
            Close
            </button>

          </div>

        </div>
      )}

    </div>
  )
}

export default ViewLost;
