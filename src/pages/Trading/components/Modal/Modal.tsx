import Button from "../Button";
import Input from "../Input";
import styles from "./Modal.module.scss";
import globalStyles from "../../../../styles/globalStyles.module.scss";
import { useState } from "react";
import moment from "moment";
import Bid from "src/types/Bid";

export type ModalProps = {
  modalOptions: {
    side: string;
    price: string;
    instrument: string;
  };
  onClose: () => void;
  onSave: (newBid: Bid) => void;
};

const Modal: React.FC<ModalProps> = ({ modalOptions, onClose, onSave }) => {
  const [volume, setVolume] = useState<number | null>(null);

  const createBid = (): Bid => {
    return {
      side: modalOptions.side,
      price: Number(modalOptions.price),
      instrument: modalOptions.instrument,
      volume: volume || 0,
      timestamp: moment().format("YYYY.MM.DD HH:mm:ss.SSS"),
    };
  };

  return (
    <div className={styles.Modal}>
      <div className={styles.Modal__window}>
        <div className={styles.Modal__header}>
          <p>Make order</p>
          <svg
            onClick={() => onClose()}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.3477 9.99858L19.5075 2.85447C19.821 2.54089 19.9972 2.11558 19.9972 1.67211C19.9972 1.22864 19.821 0.80333 19.5075 0.489749C19.1939 0.176168 18.7687 0 18.3253 0C17.8819 0 17.4566 0.176168 17.1431 0.489749L10 7.65052L2.8569 0.489749C2.54337 0.176168 2.11812 -3.30411e-09 1.67471 0C1.2313 3.30411e-09 0.806058 0.176168 0.492521 0.489749C0.178985 0.80333 0.00284159 1.22864 0.00284159 1.67211C0.00284158 2.11558 0.178985 2.54089 0.492521 2.85447L7.65227 9.99858L0.492521 17.1427C0.336458 17.2975 0.212588 17.4817 0.128055 17.6846C0.0435221 17.8875 0 18.1052 0 18.3251C0 18.5449 0.0435221 18.7626 0.128055 18.9655C0.212588 19.1684 0.336458 19.3526 0.492521 19.5074C0.64731 19.6635 0.831467 19.7874 1.03437 19.8719C1.23727 19.9565 1.4549 20 1.67471 20C1.89452 20 2.11215 19.9565 2.31505 19.8719C2.51796 19.7874 2.70211 19.6635 2.8569 19.5074L10 12.3466L17.1431 19.5074C17.2979 19.6635 17.482 19.7874 17.6849 19.8719C17.8878 19.9565 18.1055 20 18.3253 20C18.5451 20 18.7627 19.9565 18.9656 19.8719C19.1685 19.7874 19.3527 19.6635 19.5075 19.5074C19.6635 19.3526 19.7874 19.1684 19.8719 18.9655C19.9565 18.7626 20 18.5449 20 18.3251C20 18.1052 19.9565 17.8875 19.8719 17.6846C19.7874 17.4817 19.6635 17.2975 19.5075 17.1427L12.3477 9.99858Z"
              fill="#4f5052"
            />
          </svg>
        </div>
        <div className={styles.Modal__body}>
          <div>
            <span
              className={
                modalOptions.side === "BUY"
                  ? globalStyles.green
                  : globalStyles.red
              }
            >
              {modalOptions.side}
            </span>{" "}
            {modalOptions.price} {modalOptions.instrument}
          </div>
          <div className={styles.Modal__input}>
            <Input
              label="Volume"
              type="number"
              value={volume ? volume.toString() : ""}
              onChange={(newVolume) => setVolume(Number(newVolume))}
            />
          </div>
          <div className={styles.Modal__buttons}>
            <Button onClick={() => onClose()}>Cancel</Button>
            <Button
              onClick={() => {
                onSave(createBid());
                onClose();
              }}
              primary
            >
              OK
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
