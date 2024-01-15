/* eslint-disable react/prop-types */
import { useState } from "react";
import { useMyContext } from "../../context";
import styles from "./shiftCard.module.css";

import GreenSpinner from "../../assets/spinner_green.svg";
import RedSpinner from "../../assets/spinner_red.svg";

const ShiftCard = ({
  id,
  area,
  booked,
  endTime,
  startTime,
  showForMyShifts = false,
}) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { bookShift, cancelShift } = useMyContext();
  const currentTime = new Date();

  const handleBookShift = () => {
    setIsLoading(true);
    bookShift(id);
    setIsUpdated(!isUpdated);

    setIsLoading(false);
  };

  const handleCancelShift = async () => {
    setIsLoading(true);
    await cancelShift(id);
    setIsUpdated(!isUpdated);

    setIsLoading(false);
  };

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
        {showForMyShifts ? <p className={styles.area}>{area}</p> : ""}
      </div>

      <div>
        {booked ? (
          <button
            onClick={handleCancelShift}
            className={styles.cancelBtn}
            disabled={currentTime > startTime}
          >
            {isLoading ? <img src={RedSpinner} alt="Loading" /> : "Cancel"}
          </button>
        ) : (
          <button
            onClick={handleBookShift}
            className={styles.bookBtn}
            disabled={currentTime > startTime}
          >
            {isLoading ? <img src={GreenSpinner} alt="Loading" /> : "Book"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ShiftCard;
