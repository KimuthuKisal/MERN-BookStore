import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import RemoveBook from "./pages/RemoveBook";
import SelectBook from "./pages/SelectBook";
import UpdateBook from "./pages/UpdateBook";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books/create" element={<AddBook />} />
      <Route path="/books/details/:id" element={<SelectBook />} />
      <Route path="/books/edit/:id" element={<UpdateBook />} />
      <Route path="/books/delete/:id" element={<RemoveBook />} />
    </Routes>
  );
};

export default App;
