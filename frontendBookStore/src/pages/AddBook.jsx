import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import BackButtton from "../components/BackButtton";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const saveBook = () => {
    const data = {
      title,
      author,
      publishedYear,
    };
    setLoading(true);
    axios
      .post(`http://localhost:5555/books`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("Sorry! An error occured while adding the book...");
        console.log(error);
      });
  };
  return (
    <div className="p-4">
      <BackButtton />
      <h1 className="text-3xl my-4">Add a New Book</h1>
      {loading ? <Spinner /> : ""}

      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">Title</label>
          <input
            className="border-2 border-grey-500 px-4 py-2 w-full"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">Author</label>
          <input
            className="border-2 border-grey-500 px-4 py-2 w-full"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">Published Year</label>
          <input
            className="border-2 border-grey-500 px-4 py-2 w-full"
            type="number"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={saveBook}>
          Add Book
        </button>
      </div>
    </div>
  );
};

export default AddBook;
