import { useEffect, useState } from "react";
import { useMyContext } from "../../context";
import ShiftCard from "../ShiftCard";

import styles from "./allShifts.module.css"

const AllShifts = () => {
  const { groupedShifts, cities } = useMyContext();

  const [filteredShifts, setFilteredShifts] = useState({});

  const getUpdatedShifts = (selectedCity) => {
    const newShifts = {};

    Object.keys(groupedShifts).forEach((date) => {
      const shiftsForCity = groupedShifts[date].filter(
        (shift) => shift.area === selectedCity
      );

      if (shiftsForCity.length > 0) {
        newShifts[date] = shiftsForCity;
      }
    });

    setFilteredShifts(newShifts);
  };

 useEffect(()=>{
  getUpdatedShifts(cities[0])
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[])

  return (
    <div className={styles.allShiftsBox}>
      <div className={styles.citiesList}>
        {cities.map((city, idx) => (
          <h3 key={idx} onClick={() => getUpdatedShifts(city)}>
            {city}
          </h3>
        ))}
      </div>

      {Object.entries(filteredShifts).map(([key, shifts], idx) => {
        const formattedDate = new Date(key).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        });

        return (
          <div key={idx}>
            <h3 className={styles.header}>{key === "Today" ? "Today" : formattedDate}</h3>
            {shifts.map((shift) => {
              const { id, area, booked, endTime, startTime } = shift;
              return (
                <ShiftCard
                  key={id}
                  id={id}
                  area={area}
                  booked={booked}
                  endTime={endTime}
                  startTime={startTime}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default AllShifts;
