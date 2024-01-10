// MyContext.js
import { createContext, useContext, useEffect, useState } from "react";

const MyContext = createContext();

// eslint-disable-next-line react/prop-types
export const MyProvider = ({ children }) => {
  const [shifts, setShifts] = useState([]);
  const [groupedShifts, setGroupedShifts] = useState({});
  const [bookedShifts, setBookedShifts] = useState({});
  
  const [shiftTabs, setShiftTabs] = useState(false);

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
    const filterBookedShifts = (groupedShifts) => {
      const bookedShifts = {};
  
      Object.keys(groupedShifts).forEach((groupName) => {
        bookedShifts[groupName] = groupedShifts[groupName].filter(
          (shift) => shift.booked
        );
      });
  
      setBookedShifts(bookedShifts);
    };

    filterBookedShifts();
  }, [shifts]);

  useEffect(() => {
    const groupShifts = () => {
      const today = new Date().setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const groupedShifts = {};

      shifts.forEach((shift) => {
        const { startTime } = shift;
        const shiftDate = new Date(startTime).setHours(0, 0, 0, 0);

        const date = new Date(shiftDate);

        if (shiftDate === today) {
          groupedShifts["Today"] = groupedShifts["Today"] || [];
          groupedShifts["Today"].push({ ...shift, date });
        } else if (shiftDate === tomorrow) {
          groupedShifts["Tomorrow"] = groupedShifts["Tomorrow"] || [];
          groupedShifts["Tomorrow"].push({ ...shift, date });
        } else {
          groupedShifts[date] = groupedShifts[date] || [];
          groupedShifts[date].push({ ...shift, date });
        }
      });

      setGroupedShifts(groupedShifts);
    };
    groupShifts();
  }, [shifts]);

  const handleShiftTabs = (val) => {
    setShiftTabs(val);
  };

  const valueList = {
    shifts,
    bookedShifts,
    shiftTabs,
    groupedShifts,
    handleShiftTabs,
  };
  return <MyContext.Provider value={valueList}>{children}</MyContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMyContext = () => {
  return useContext(MyContext);
};
