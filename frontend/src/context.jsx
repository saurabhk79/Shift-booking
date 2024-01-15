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

  useEffect(() => {
    /**
     * Fetches shifts from the server and updates the state.
     * @async
     * @returns {Promise<void>}
     */
    const fetchShifts = async () => {
      // const URL = "https://shift-booking-backend.onrender.com/shifts";
      const URL = "http://localhost:8080/shifts";

      const res = await fetch(URL);
      const data = await res.json();

      setShifts(data);
    };

    fetchShifts();
  }, []);

  useEffect(() => {
    /**
     * Extracts unique cities from the shifts and updates the state.
     * @param {Array} shifts - List of shifts.
     */
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
    /**
     * Groups shifts by date and updates the state.
     * @function
     * @name groupShifts
     */
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
    /**
     * Filters and groups booked shifts and updates the state.
     * @param {Object} groupedShifts - Shifts grouped by date.
     */
    const filterBookedShifts = (groupedShifts) => {
      const newBookedShifts = {};
      if (!groupedShifts) return;

      Object.keys(groupedShifts).forEach((groupName) => {
        newBookedShifts[groupName] = groupedShifts[groupName]
          .filter((shift) => shift.booked)
          .sort((a, b) => a.startTime - b.startTime);
      });

      setBookedShifts(newBookedShifts);
    };

    filterBookedShifts(groupedShifts);
  }, [groupedShifts]);

  /**
   * Handles the state of the shiftTabs.
   * @param {boolean} val - New value for shiftTabs.
   */
  const handleShiftTabs = (val) => {
    setShiftTabs(val);
  };

  /**
   * Books a shift by updating its 'booked' status in the state.
   * @async
   * @param {string} id - ID of the shift to be booked.
   * @returns {Promise<void>}
   */
  const bookShift = async (id) => {
    // const URL = `http://localhost:8080/shifts/${id}/book`;

    // backend not accepting post request
    // const res = await fetch(URL, {
    //   method: "POST",
    // });
    // const data = await res.json();

    const newShifts = [...shifts];
    let shift = newShifts.find((ele) => ele.id === id);

    if (!shift.booked) {
      shift.booked = true;
      setShifts(newShifts);
    }
  };

  /**
   * Cancels a booked shift by updating its 'booked' status in the state.
   * @async
   * @param {string} id - ID of the shift to be canceled.
   * @returns {Promise<void>}
   */
  const cancelShift = async (id) => {
    const newShifts = [...shifts];
    let shift = newShifts.find((ele) => ele.id === id);

    if (shift.booked) {
      shift.booked = false;
      setShifts(newShifts);
    }
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
