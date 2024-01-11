/* eslint-disable react/prop-types */
// import React from "react";
import { useMyContext } from "../../context";
import styles from "./shiftCard.module.css";

const ShiftCard = ({
  id,
  area,
  booked,
  endTime,
  startTime,
  showForMyShifts = false,
}) => {
  const { bookShift, cancelShift } = useMyContext();
  const currentTime = new Date();

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const options = { hour: "2-digit", minute: "2-digit", hour12: false };
    return date.toLocaleTimeString("en-US", options);
  };

  return (
    <div className={styles.shiftCard}>
      <div>
        <div className={styles.timing}>
          {formatTime(startTime)}-{formatTime(endTime)}
        </div>
        {showForMyShifts ? <p>{area}</p> : ""}
      </div>

      <div>
        {booked ? (
          <button
            onClick={() => cancelShift(id)}
            disabled={currentTime > startTime}
          >
            Cancel
          </button>
        ) : (
          <button onClick={() => bookShift(id)} className={styles.bookBtn}>Book</button>
        )}
      </div>
    </div>
  );
};

export default ShiftCard;
