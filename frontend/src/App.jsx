import { useMyContext } from "./context";
import styles from "./app.module.css";
// import MyShifts from "./components/MyShifts";
import AllShifts from "./components/AllShifts";

const App = () => {
  const {  groupedShifts  } = useMyContext();

  console.log(groupedShifts);
  return (
    <div className={styles.app}>
      <div className={styles.shiftTabs}>
        <span>My shifts</span>
        <span>Available shifts</span>
      </div>
      <AllShifts />
    </div>
  );
};

export default App;
