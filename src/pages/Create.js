import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import supabase from "../config/supabaseClient";

const Create = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [formError, setFormError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    console.log(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !file) {
      setFormError("Please fill in all the fields correctly.");
      toast.error("Please fill in all the fields correctly", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    // uploading file to supabase storage
    const { data: fileData, error: fileError } = await supabase.storage
      .from("files")
      .upload(`files/${file.name}`, file);

      if (fileError) {
        console.error('Error uploading file:', fileError);
        setFormError("Error uploading file.");
        toast.error("Error uploading file", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }
      toast.success("File uploaded successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      // console.log(fileData);
    const file_path = await supabase.storage
      .from("files")
      .getPublicUrl(fileData.path);
    console.log(file_path.data.publicUrl);
    const { data, error } = await supabase
      .from("notes")
      .insert([{ title, description, file_path: file_path.data.publicUrl }]);

    if (error) {
      console.log(error);
      setFormError("Please fill in all the fields correctly.");
      toast.error("Please fill in all the fields correctly", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    if (data) {
      // console.log(data);
      setFormError(null);
      navigate("/");
    }
  };

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
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
        <h1 className="text-3xl font-semibold text-center mb-4">
          Add New File to Drive
        </h1>
        {formError && (
          <p className="text-red-500 text-center mb-4">{formError}</p>
        )}
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
        <div className="flex flex-col mb-4">
          <label htmlFor="file" className="text-lg mb-2">
            File
          </label>
          <input
            type="file"
            name="file"
            id="file"
            className="border-2 border-black rounded-lg p-2"
            onChange={handleFileChange}
          />
        </div>
        <button
          className="bg-lime-400 hover:bg-lime-300 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Add File to Drive
        </button>
      </form>
    </div>
  );
};

export default Create;
