// import { Link } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md"
import { PiPencilSimpleBold } from "react-icons/pi"
import { Link } from "react-router-dom";

const Note = ({ id, title, description, file_path }) => {
  return (
    <div className="relative">
      <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 border-solid border-2 border-black hover:border-lime-300 m-2">
        <div className="p-6">
          <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            {title}
          </h5>
          <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
            {description}
          </p>
        </div>
        <div className="p-6 pt-0">
          {file_path ? (
            <a href={file_path}>
              <button
                className="select-none rounded-lg bg-lime-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                data-ripple-light="true"
              >
                View File
              </button>
            </a>) : (
              <button
              className="select-none rounded-lg bg-transparent py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              data-ripple-light="true"
            >
              No File
            </button>
          )}
          {/* button to update */}
          
          
        </div>
      </div>
        <button
            className="absolute top-0 right-0   select-none rounded-lg bg-red-600 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            data-ripple-light="true"
          >
            <MdOutlineDelete size={20} />
          </button>
          <Link to={`/${id}`}>
            <button
              className=" absolute bottom-0 right-0 select-none rounded-lg bg-green-300 py-2 px-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              data-ripple-light="true"
            >
              <PiPencilSimpleBold size={20} />
            </button>
          </Link>
    </div>
  );
};

export default Note;