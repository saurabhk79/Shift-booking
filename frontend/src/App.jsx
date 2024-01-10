import { useMyContext } from "./context";
import styles from "./app.module.css";
import ShiftCard from "./components/ShiftCard";

const App = () => {
  const {  groupedShifts } = useMyContext();

    console.log(groupedShifts);
  return (
    <div className={styles.app}>
      <div className={styles.shiftTabs}>
        <span>My shifts</span>
        <span>Available shifts</span>
      </div>

      <ShiftCard />
    </div>
  );
};

export default App;
