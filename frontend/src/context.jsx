// MyContext.js
import { createContext, useContext } from "react";

const MyContext = createContext();

// eslint-disable-next-line react/prop-types
export const MyProvider = ({ children }) => {
  let count = 0;

  const valueList = { count };
  return <MyContext.Provider value={valueList}>{children}</MyContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMyContext = () => {
  return useContext(MyContext);
};
