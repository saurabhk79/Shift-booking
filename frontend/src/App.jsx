import { useMyContext } from "./context";
import styles from "./app.module.css";

const App = () => {
  const { shifts, bookedShifts } = useMyContext();

    // console.log(bookedShifts);
  return (
    <div className={styles.app}>
      <div className={styles.shiftTabs}>
        <span>My shifts</span>
        <span>Available shifts</span>
      </div>
    </div>
  );
};

export default App;
