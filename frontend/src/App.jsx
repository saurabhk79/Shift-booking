import { useMyContext } from "./context";
import styles from "./app.module.css";

const App = () => {
  const { count } = useMyContext();

  console.log(count);

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
