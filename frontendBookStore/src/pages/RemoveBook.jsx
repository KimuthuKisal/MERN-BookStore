import React, { useState } from "react";
import BackButtton from "../components/BackButtton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const RemoveBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const removeBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("Sorry! An error occured while removing the book...");
        console.log(error);
      });
  };
  const cancelRemove = () => {
    navigate("/");
  };
  return (
    <div className="p-4">
      <BackButtton />
      <h1 className="text-3xl my-4">Remove Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">
          You are going to remove this book... Are You Sure?
        </h3>
        <div className="flex justify-center gap-x-4">
          <button
            className="p-4 bg-red-600 text-white m-8 w-full w-[150px]"
            onClick={removeBook}
          >
            Yes
          </button>
          <button
            className="p-4 bg-green-600 text-white m-8 w-full w-[150px]"
            onClick={cancelRemove}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveBook;
