import { useMyContext } from "../../context";
import ShiftCard from "../ShiftCard";

const AllShifts = () => {
  const { groupedShifts } = useMyContext();
  console.log(Object.entries(groupedShifts));
  return (
    <div>
      {/* eslint-disable-next-line no-unused-vars */}
      {Object.entries(groupedShifts).map(([key, shifts], idx) => {
        const formattedDate = new Date(key).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
          });

        return (
          <div key={idx}>
            <h1>{key === "Today" ? "Today" : formattedDate}</h1>
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
