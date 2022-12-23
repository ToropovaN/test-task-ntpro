import React from "react";
import Prices from "./components/Prices";
import Timer from "./components/Timer";
import styles from "./Trading.module.scss";

const Trading: React.FC = () => {
  return (
    <div className={styles.Trading}>
      <Timer />
      <Prices />
    </div>
  );
};

export default Trading;
