// import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
// import { BsInfoCircle } from "react-icons/bs";
// import { MdOutlineDelete } from "react-icons/md";

const BookModel = ({ book, onClose }) => {
  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 justify-center items-center"
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-60 z-50"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[600px] max-w-full bg-white rounded-xl p-4 flex flex-col relative"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <h2 className="w-fit px-4 py-1 bg-red-300 rounded-lg">
          {book.publishedYear}
        </h2>
        <h4 className="my-2 text-gray-500">{book._id}</h4>
        <div className="flex justify-start items-center gap-x-2">
          <PiBookOpenTextLight className="text-red-300 text-2xl" />
          <h2 className="my-1">{book.title}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <BiUserCircle className="text-red-300 text-2xl" />
          <h2 className="my-1">{book.author}</h2>
        </div>
        <p className="mt-4">Genre: Classic Literature, Fiction</p>
        <p className="mt-4">
          Plot Summary: Set in the Roaring Twenties, "The Great Gatsby" tells
          the story of Jay Gatsby, a mysterious millionaire who throws lavish
          parties in hopes of winning back his lost love, Daisy Buchanan.
          Narrated by Nick Carraway, a young man from the Midwest who becomes
          Gatsby's neighbor on Long Island, the novel explores themes of love,
          wealth, and the American Dream. As Nick becomes entangled in the lives
          of Gatsby and the Buchanans, he uncovers the darker truths beneath
          their glamorous façade.
        </p>
        <p className="mt-4">
          Main Characters: Jay Gatsby, Daisy Buchanan, Tom Buchanan, Nick
          Carraway, Jordan Baker
        </p>
        <p className="mt-4">
          Setting: Long Island and New York City during the 1920s Critical
          Review: "The Great Gatsby" is widely regarded as one of the greatest
          American novels of the 20th century. F. Scott Fitzgerald's prose
          captures the essence of the Jazz Age, while his exploration of social
          class and moral decay continues to resonate with readers today. The
          novel's tragic ending and timeless themes make it a must-read for
          anyone interested in American literature.
        </p>
      </div>
    </div>
  );
};

export default BookModel;
