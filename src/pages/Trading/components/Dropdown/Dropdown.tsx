import { memo } from "react";
import Currencies from "src/types/Currencies";
import Exchanges from "src/types/Exchanges";
import styles from "./Dropdown.module.scss";

export type DropdownProps = {
  onChange: (newOpt: string) => void;
};

export type DropdownOption = {
  firstCurrency: string;
  secondCurrency: string;
  exchange: string;
};

const generateOptions = () => {
  const options: DropdownOption[] = [];
  for (let i = 0; i < Currencies.length; i++) {
    for (let j = 0; j < Currencies.length; j++) {
      if (i !== j) {
        Exchanges.forEach((ex) => {
          options.push({
            firstCurrency: Currencies[i],
            secondCurrency: Currencies[j],
            exchange: ex,
          });
        });
      }
    }
  }
  return options;
};

const Dropdown: React.FC<DropdownProps> = ({ onChange }) => {
  return (
    <div className={styles.Dropdown__wrapper}>
      <select
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className={styles.Dropdown}
      >
        {generateOptions().map((opt, index) => (
          <option
            className={styles.Dropdown__option}
            key={index}
            value={
              opt.firstCurrency + "/" + opt.secondCurrency + "_" + opt.exchange
            }
          >
            {opt.firstCurrency + "/" + opt.secondCurrency + " " + opt.exchange}
          </option>
        ))}
      </select>
    </div>
  );
};

export default memo(Dropdown);
