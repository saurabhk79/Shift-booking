// MyContext.js
import { createContext, useContext, useEffect, useState } from "react";

const MyContext = createContext();

// eslint-disable-next-line react/prop-types
export const MyProvider = ({ children }) => {
  const [shifts, setShifts] = useState([]);
  const [bookedShifts, setBookedShifts] = useState([]);
  const [shiftTabs, setShiftTabs] = useState(false)

  useEffect(() => {
    const fetchShifts = async () => {
      const URL = "http://localhost:8080/shifts";

      const res = await fetch(URL);
      const data = await res.json();
      // console.log(data)
      setShifts(data);
    };

    fetchShifts();
  }, []);

  useEffect(() => {
    const getBookedShifts = () => {
      const bookedList = shifts.filter((booking) => booking.booked === true);

      setBookedShifts(bookedList);
    };

    getBookedShifts();
  }, [shifts]);

  const handleShiftTabs = (val) => {
    setShiftTabs(val)
  }

  const valueList = { shifts, bookedShifts, shiftTabs, handleShiftTabs};
  return <MyContext.Provider value={valueList}>{children}</MyContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMyContext = () => {
  return useContext(MyContext);
};
