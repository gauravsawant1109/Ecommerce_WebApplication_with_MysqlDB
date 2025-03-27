import React, { createContext, useContext, useEffect, useState } from "react";
import authService from "../Servises/authService";


export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await authService.getUser();
      setUser(userInfo);
    };
    fetchUser();
  }, []);

  console.log("User Info:", user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
