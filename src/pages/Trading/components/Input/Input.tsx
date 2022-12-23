import styles from "./Input.module.scss";

export type InputProps = {
  label: string;
  type: string;
  value: string;
  onChange: (x: string) => void;
};

const Input: React.FC<InputProps> = ({ label, type, onChange, value }) => {
  return (
    <label className={styles.Input}>
      <p>{label}</p>
      <input
        value={value}
        type={type}
        className={styles.Input__field}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
};

export default Input;
