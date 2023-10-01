import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import supabase from "../config/supabaseClient"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState(null)

  useEffect(() => {
    const fetcFile = async () => {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("id", id)
        .single()
      if (error) {
        console.log(error)
        navigate("/", { replace: true })
      }

      if(data) {
        setTitle(data.title)
        setDescription(data.description)
        setFile(data.file_path)
        console.log(data);
        console.log(file);
      }
    }
    fetcFile()
  }, [id,file, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !description) {
      toast.error("Please fill in all the fields correctly", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      return
    }

    // inserting file data to supabase database
    const { data, error } = await supabase.from("notes").update([
      {
        title,
        description
      },
    ]).eq("id", id)
    .select("*");
    console.log(data);

    if (error) {
      console.error("Error inserting file data:", error)
      toast.error("Error inserting file data", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      return
    }
    toast.success("File data inserted successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })
    navigate("/", { replace: true })
  }

  return (
    <div className="page update">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <form onSubmit={handleSubmit}>
        <h1 className="text-3xl font-semibold text-center mb-4">
          Update File {id}
        </h1>
        <div className="flex flex-col mb-4">
          <label htmlFor="title" className="text-lg mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="border-2 border-black rounded-lg p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="description" className="text-lg mb-2">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="5"
            className="border-2 border-black rounded-lg p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button
          className="bg-lime-400 hover:bg-lime-300 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Update File Info
        </button>

      {/* <a href={file} className="my-3">
        <button
          className="bg-slate-300 hover:bg-slate-400 text-black font-bold py-2 px-4 rounded"
          type="submit"
        >
          View File
        </button>
      </a> */}
      </form>
    </div>
  )
}

export default Update