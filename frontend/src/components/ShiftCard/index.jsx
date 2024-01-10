// import React from "react";
import styles from "./shiftCard.module.css";

// eslint-disable-next-line react/prop-types
const ShiftCard = ({ area, booked, endTime, startTime }) => {
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
          <button disabled={currentTime > startTime}>Cancel</button>
        ) : (
          <button>Book</button>
        )}
      </div>
    </div>
  );
};

export default ShiftCard;
