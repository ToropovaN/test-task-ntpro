import React, { useContext } from "react";
import { BidsContext } from "src/App";
import styles from "./Archive.module.scss";
import globalStyles from "../../styles/globalStyles.module.scss";

const Archive: React.FC = () => {
  const bidsContext = useContext(BidsContext);
  return (
    <div className={styles.Archive}>
      <div className={styles.Archive__wrapper}>
        <table className={styles.Archive__table}>
          <thead className={styles.Archive__header}>
            <tr>
              <td>Side</td>
              <td>Price</td>
              <td>Instrument</td>
              <td>Volume</td>
              <td>Timestamp</td>
            </tr>
          </thead>
          <tbody className={styles.Archive__body}>
            {bidsContext.bids.map((bid) => (
              <tr key={bid.timestamp}>
                <td
                  className={
                    bid.side === "BUY" ? globalStyles.green : globalStyles.red
                  }
                >
                  {bid.side}
                </td>
                <td>{bid.price}</td>
                <td>{bid.instrument}</td>
                <td>{bid.volume}</td>
                <td>{bid.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Archive;
