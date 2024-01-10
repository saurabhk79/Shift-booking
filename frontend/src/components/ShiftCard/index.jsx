// import React from "react";
import { useMyContext } from "../../context";
import styles from "./shiftCard.module.css";

// eslint-disable-next-line react/prop-types
const ShiftCard = ({ id,area, booked, endTime, startTime }) => {
  const {bookShift, cancelShift} = useMyContext()
  const currentTime = new Date();

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const options = { hour: "2-digit", minute: "2-digit", hour12: false };
    return date.toLocaleTimeString("en-US", options);
  };

  return (
    <div className={styles.shiftCard}>
      <div>
        <h3>
          {formatTime(startTime)}-{formatTime(endTime)}
        </h3>
        <p>{area}</p>
      </div>

      <div>
        {booked ? (
          <button onClick={()=> cancelShift(id)} disabled={currentTime > startTime}>Cancel</button>
        ) : (
          <button onClick={()=> bookShift(id)}>Book</button>
        )}
      </div>
    </div>
  );
};

export default ShiftCard;
