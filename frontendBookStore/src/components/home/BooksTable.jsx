import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import BookModel from "./BookModel";
import { BiUserCircle, BiShow } from "react-icons/bi";

const BooksTable = ({ books }) => {
  const [showModel, setShowModel] = useState(false);
  return (
    <table className="w-full border-separate border-spacing-2">
      <thead>
        <tr>
          <th className="border border-slate-600 rounded-md">No</th>
          <th className="border border-slate-600 rounded-md">Title</th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Author
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Published Year
          </th>
          <th className="border border-slate-600 rounded-md">Operations</th>
        </tr>
      </thead>

      <tbody>
        {books.map((book, index) => (
          <tr key={book._id} className="h-8">
            <td className="border border-slate-700 rounded-md text-center">
              {index + 1}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              {book.title}
            </td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {book.author}
            </td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {book.publishedYear}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              <div className="flex justify-center gap-x-4">
                <BiShow
                  className="text-3xl text-blue-800 hover:text-black cursor-pointer"
                  onClick={() => setShowModel(true)}
                />
                <Link to={`/books/details/${book._id}`}>
                  <BsInfoCircle className="text-green-800 text-2xl" />
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                  <AiOutlineEdit className="text-yellow-600 text-2xl" />
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                  <MdOutlineDelete className="text-red-600 text-2xl" />
                </Link>
              </div>
            </td>
            {showModel && (
              <BookModel book={book} onClose={() => setShowModel(false)} />
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;
