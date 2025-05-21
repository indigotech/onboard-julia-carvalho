import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/login";
import { UserList } from "../pages/user-list";
import { CreateUser } from "../pages/create-user";
import { UserDetails } from "../pages/user-details";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user-list" element={<UserList />} />
      <Route path="/create-user" element={<CreateUser />} />
      <Route path="/user/:id" element={<UserDetails />} />
    </Routes>
  );
};
