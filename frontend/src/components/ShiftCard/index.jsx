// import React from "react";
import styles from "./shiftCard.module.css";

const ShiftCard = () => {
  const dummyData = {
    area: "Helsinki",
    booked: false,
    endTime: 1704875400000,
    id: "9cfe26ec-c094-4c5c-85d5-f483f37dd733",
    startTime: 1704868200000,
  };

  const currentTime = new Date()

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const options = { hour: "2-digit", minute: "2-digit", hour12: false };
    return date.toLocaleTimeString("en-US", options);
  };

  return (
    <div className={styles.shiftCard}>
      <div>
        <h3>
          {formatTime(dummyData.startTime)}-{formatTime(dummyData.endTime)}
        </h3>
        <p>{dummyData.area}</p>
      </div>

      <div>
        <button disabled={currentTime < dummyData.startTime}>Cancel</button>
      </div>
    </div>
  );
};

export default ShiftCard;
