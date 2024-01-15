import { useMyContext } from "./context";
import styles from "./app.module.css";
import MyShifts from "./components/MyShifts";
import AllShifts from "./components/AllShifts";

const App = () => {
  const { shiftTabs, handleShiftTabs } = useMyContext();

  return (
    <div className={styles.app}>
      <div className={styles.shiftTabs}>
        <span
          onClick={() => handleShiftTabs(false)}
          style={{
            color: shiftTabs ? "var(--color-dullBlue)" : "var(--color-blue)",
          }}
        >
          My shifts
        </span>
        <span
          onClick={() => handleShiftTabs(true)}
          style={{
            color: shiftTabs ? "var(--color-blue)" : "var(--color-dullBlue)",
          }}
        >
          Available shifts
        </span>
      </div>
      <div className={styles.shiftsBox}>
        {shiftTabs ? <AllShifts /> : <MyShifts />}
      </div>
    </div>
  );
};

export default App;
