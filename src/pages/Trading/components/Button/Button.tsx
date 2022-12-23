import classNames from "classnames";
import styles from "./Button.module.scss";

export enum ButtonColor {
  primary = "primary",
  secondary = "secondary",
}

export type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  primary?: boolean;
};
const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  primary = false,
}) => {
  return (
    <button
      onClick={() => {
        if (onClick) onClick();
      }}
      className={classNames(
        styles.button,
        primary ? styles["button-primary"] : styles["button-secondary"]
      )}
    >
      {children}
    </button>
  );
};

export default Button;
