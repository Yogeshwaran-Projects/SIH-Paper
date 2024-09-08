"use client"
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    website: "",
    profession: "",
    about: "",
    id: "",
  });

  const [StartYear, setStartYear] = useState(undefined);
  const [EndYear, setEndYear] = useState(undefined);

  return (
    <UserContext.Provider value={{ userData, setUserData , StartYear,EndYear,setEndYear,setStartYear}}>
      {children}
    </UserContext.Provider>
  );
};