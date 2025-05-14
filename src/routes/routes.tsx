import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/login";
import { UserList } from "../pages/user-list";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user-list" element={<UserList />} />
    </Routes>
  );
};