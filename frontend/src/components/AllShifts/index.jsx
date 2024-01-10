import { useState } from "react";
import { useMyContext } from "../../context";
import ShiftCard from "../ShiftCard";

const AllShifts = () => {
  const { groupedShifts, cities } = useMyContext();

  const [filteredShifts, setFilteredShifts] = useState(groupedShifts)

  const getUpdatedShifts = (selectedCity) => {
    const newShifts = {};

    Object.keys(groupedShifts).forEach((date) => {
      const shiftsForCity = groupedShifts[date].filter((shift) => shift.area === selectedCity);

      if (shiftsForCity.length > 0) {
        newShifts[date] = shiftsForCity;
      }
    });

    setFilteredShifts(newShifts);
  };

  console.log(filteredShifts)

  return (
    <div>
      <div>
        {cities.map((city, idx) => (
          <span key={idx} onClick={()=>getUpdatedShifts(city)}>{city}</span>
        ))}
      </div>

      {/* eslint-disable-next-line no-unused-vars */}
      {Object.entries(filteredShifts).map(([key, shifts], idx) => {
        const formattedDate = new Date(key).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        });

        return (
          <div key={idx}>
            <h3>{key === "Today" ? "Today" : formattedDate}</h3>
            {shifts.map((shift) => {
              const { area, booked, endTime, startTime } = shift;
              return (
                <ShiftCard
                  key={shift.id}
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
