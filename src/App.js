import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

// pages
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"


function App() {
  
  return (
    <BrowserRouter>
      <nav className="bg-slate-950 w-full py-3 mb-2 text-center text-white">
        <Link to={"/"}>
        <h1 className="text-2xl text-lime-400 font-semibold">Supa Drive</h1>
        </Link>
        <div className="flex items-center justify-center space-x-8 pt-2">
          <Link className="hover:text-lime-300 hover:underline" to="/">Home</Link>
          <Link className="hover:text-lime-300 hover:underline" to="/create">Add New File</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
