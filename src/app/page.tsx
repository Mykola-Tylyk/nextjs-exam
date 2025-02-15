import Link from "next/link";
import styles from "./page.module.css";

const Home = () => {


  return (
      <div className={styles.homePage}>
          <h2>Welcome. To view user recipes you need to log in.</h2>
          <Link href={'/login'}>Login</Link>
      </div>
  );
};

export default Home;
