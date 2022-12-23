import { useCallback, useContext, useEffect, useState } from "react";
import { BidsContext } from "src/App";
import Bid from "src/types/Bid";
import Currencies from "src/types/Currencies";
import Exchanges from "src/types/Exchanges";
import Dropdown from "../Dropdown";
import Modal from "../Modal";
import styles from "./Prices.module.scss";

const Prices: React.FC = () => {
  const [option, setOption] = useState(
    Currencies[0] + "/" + Currencies[1] + "_" + Exchanges[0]
  );
  const [buy, setBuy] = useState("");
  const [sell, setSell] = useState("");
  const [modalOpened, setModalOpened] = useState<"BUY" | "SELL" | null>(null);

  //update prices when a currency pair changes
  useEffect(() => {
    setBuy((Math.random() * 9).toFixed(4));
    setSell((Math.random() * 9).toFixed(4));
  }, [option]);

  //update prices randomly
  useEffect(() => {
    const buyTimeout = setTimeout(
      () => setBuy((Math.random() * 9).toFixed(4)),
      Math.random() * 7000
    );
    const sellTimeout = setTimeout(
      () => setSell((Math.random() * 9).toFixed(4)),
      Math.random() * 7000
    );
    return () => {
      clearTimeout(buyTimeout);
      clearTimeout(sellTimeout);
    };
  }, [buy, sell]);

  const bidsContext = useContext(BidsContext);

  return (
    <>
      <Dropdown
        onChange={useCallback((newOpt) => {
          setOption(newOpt);
        }, [])}
      />
      <div className={styles.Prices}>
        <div
          className={styles.Prices__block}
          onClick={() => setModalOpened("BUY")}
        >
          <p>BUY</p>
          <p>{buy}</p>
        </div>
        <div
          className={styles.Prices__block}
          onClick={() => setModalOpened("SELL")}
        >
          <p>SELL</p>
          <p>{sell}</p>
        </div>
      </div>
      {modalOpened && (
        <Modal
          modalOptions={{
            side: modalOpened,
            price: modalOpened === "BUY" ? buy : sell,
            instrument: option,
          }}
          onClose={() => setModalOpened(null)}
          onSave={(newBid: Bid) => {
            bidsContext.setBids((prevValue) => {
              const newBids = prevValue;
              newBids.push(newBid);
              sessionStorage.setItem("Bids", JSON.stringify(newBids));
              return newBids;
            });
          }}
        ></Modal>
      )}
    </>
  );
};

export default Prices;
