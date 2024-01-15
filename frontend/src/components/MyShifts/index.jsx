import { useMyContext } from "../../context"
import ShiftCard from "../ShiftCard"
import styles from "./myShifts.module.css"

const MyShifts = () => {
    const {bookedShifts} = useMyContext()
    console.log(Object.entries(bookedShifts))
  return (
    <div>
      {Object.entries(bookedShifts).map(([key, shifts], idx) => {
        const formattedDate = new Date(key).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        });

        return (
          <div key={idx}>
            {shifts.length === 0 ? <></> : <h3 className={styles.header}>{key === "Today" ? "Today" : formattedDate}</h3>}
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
  )
}

export default MyShifts