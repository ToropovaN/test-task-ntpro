import moment from "moment";
import React, { memo, useEffect, useState } from "react";
import styles from "./Timer.module.scss";

const Timer: React.FC = () => {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div className={styles.Timer}>{moment().format("HH:mm:ss")}</div>;
};

export default memo(Timer);
