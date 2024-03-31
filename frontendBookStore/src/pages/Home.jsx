import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BooksCard from "../components/home/BooksCard";
import BooksTable from "../components/home/BooksTable";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayType, setdisplayType] = useState("table");
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  const cardButtonClass = displayType === "card" ? "bg-sky-600" : "bg-sky-300";
  const tableButtonClass = displayType === "table" ? "bg-sky-600" : "bg-sky-300";
  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className={`${cardButtonClass} hover:bg-black hover:text-white px-4 py-1 rounded-lg`}
          onClick={() => setdisplayType("card")}
        >
          Card
        </button>
        <button
          className={`${tableButtonClass} hover:bg-black hover:text-white px-4 py-1 rounded-lg`}
          onClick={() => setdisplayType("table")}
        >
          Table
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Book List</h1>
        <Link to={`/books/create`}>
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : displayType == "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
