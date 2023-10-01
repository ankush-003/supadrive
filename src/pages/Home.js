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

  const handleDelete = async (id) => {
    setNotes(prevnotes => {
      return prevnotes.filter(note => note.id !== id)
    });
  }

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
      const { data, error } = await supabase.from("notes").select("*");

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
  }, []);


  return (
    <div className="page home" on>
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
      <h2 className="font-poppins text-center text-xl font-semibold ">Your Files</h2>
      {fetchError && (
        <p className="text-center text-red-500 font-bold text-xl my-10">
          {"404 Notes Not Found"}
        </p>
      )}
      {notes && (
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
      )}
    </div>
  );
};

export default Home;
