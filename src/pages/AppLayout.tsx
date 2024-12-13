import Map from "../components/Map/Map";
import Sidebar from "../components/Sidebar/Sidebar";
import UserBox from "../components/User/User";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <UserBox />
    </div>
  );
}

export default AppLayout;
