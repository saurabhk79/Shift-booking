// MyContext.js
import { createContext, useContext, useEffect, useState } from "react";

const MyContext = createContext();

// eslint-disable-next-line react/prop-types
export const MyProvider = ({ children }) => {
  const [shifts, setShifts] = useState([]);
  const [groupedShifts, setGroupedShifts] = useState({});
  const [bookedShifts, setBookedShifts] = useState({});
  const [cities, setCities] = useState([]);

  const [shiftTabs, setShiftTabs] = useState(false);
  const [isUpdated, setIsUpdated] = useState(true);

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
    const getAllCities = (shifts) => {
      const uniqueCities = new Set();

      shifts.forEach((shift) => {
        uniqueCities.add(shift.area);
      });

      const citiesArray = Array.from(uniqueCities);

      setCities(citiesArray);
    };
    getAllCities(shifts);
  }, [shifts]);

  useEffect(() => {
    const groupShifts = () => {
      const today = new Date().setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const newGroupedShifts = {};

      shifts.forEach((shift) => {
        const { startTime } = shift;
        const shiftDate = new Date(startTime).setHours(0, 0, 0, 0);

        const date = new Date(shiftDate);

        if (shiftDate === today) {
          newGroupedShifts["Today"] = newGroupedShifts["Today"] || [];
          newGroupedShifts["Today"].push({ ...shift, date });
        } else if (shiftDate === tomorrow) {
          newGroupedShifts["Tomorrow"] = newGroupedShifts["Tomorrow"] || [];
          newGroupedShifts["Tomorrow"].push({ ...shift, date });
        } else {
          newGroupedShifts[date] = newGroupedShifts[date] || [];
          newGroupedShifts[date].push({ ...shift, date });
        }
      });

      Object.keys(newGroupedShifts).forEach((groupName) => {
        newGroupedShifts[groupName].sort((a, b) => a.startTime - b.startTime);
      });

      setGroupedShifts(newGroupedShifts);
    };
    groupShifts();
  }, [shifts]);

  useEffect(() => {
    const filterBookedShifts = (groupedShifts) => {
      const bookedShifts = {};
      if (!groupedShifts) return;

      Object.keys(groupedShifts).forEach((groupName) => {
        bookedShifts[groupName] = groupedShifts[groupName]
          .filter((shift) => shift.booked)
          .sort((a, b) => a.startTime - b.startTime);
      });

      setBookedShifts(bookedShifts);
    };

    filterBookedShifts(groupedShifts);
  }, [groupedShifts]);

  const handleShiftTabs = (val) => {
    setShiftTabs(val);
  };

  const bookShift = async (id) => {
    const URL = `http://localhost:8080/shifts/${id}/book`;

    console.log(id)
    try {
      const res = await fetch(URL, {
        method: "POST",
      });
      const data = await res.json();
      console.log(data);

      // setIsUpdated(!isUpdated);
    } catch (error) {
      console.error("Error while booking the shift", error);
    }
  };

  const cancelShift = async (id) => {
    const URL = `http://localhost:8080/shifts/${id}/cancel`;
    await fetch(URL);

    setIsUpdated(!isUpdated);
  };

  const valueList = {
    shifts,
    cities,
    bookedShifts,
    shiftTabs,
    groupedShifts,
    handleShiftTabs,
    bookShift,
    cancelShift,
  };
  return <MyContext.Provider value={valueList}>{children}</MyContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMyContext = () => {
  return useContext(MyContext);
};
