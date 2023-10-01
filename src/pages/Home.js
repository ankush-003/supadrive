import supabase from "../config/supabaseClient.js";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Note from "../components/Note.js";
import Lottie from "react-lottie";
import animationData from "../animations/note_animation.json";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [notes, setNotes] = useState(null);

  const [orderBy, setOrderBy] = useState("created_at");

  const handleDelete = async (id) => {
    setNotes((prevnotes) => {
      return prevnotes.filter((note) => note.id !== id);
    });
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .order(orderBy, { ascending: false });

      if (error) {
        setFetchError(error);
        toast.error("Error while fetching notes", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log(error);
        setNotes(null);
        return;
      }

      setNotes(data);
      toast.success("Notes Fetched", {
        toastId: "notes-fetched",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setFetchError(null);
      console.log(data);
    };
    fetchNotes();
  }, [orderBy]);

  return (
    <div className="page home">
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
      <h2 className="font-poppins text-center text-xl font-semibold ">
        Your Files
      </h2>
      {fetchError && (
        <p className="text-center text-red-500 font-bold text-xl my-10">
          {"404 Notes Not Found"}
        </p>
      )}
      {notes && (
        <>
          <div className="flex gap-4 p-1 mx-4 items-center">
            <p className="font-poppins text-center text-lg font-semibold ">
              Order By:
            </p>
            <select
              className="font-poppins text-center text-lg bg-lime-400  font-semibold border-2 border-black rounded-xl p-1"
              value={orderBy}
              onChange={(e) => setOrderBy(e.target.value)}
            >
              <option value="created_at" selected>
                Time Created
              </option>
              <option value="file_size">File Size</option>
              <option value="title">Title</option>
            </select>
          </div>
          <div className="grid md:grid-cols-4 sm:grid-cols-2">
            <div className="notes flex flex-wrap md:gap-x-8 sm:gap-5 items-center sm:col-span-2 md:col-span-3">
              {notes.map((note) => (
                <Note key={note.id} {...note} onDelete={handleDelete} />
              ))}
            </div>
            <div className="col-span-1">
              <Lottie options={defaultOptions} height={450} width={450} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
