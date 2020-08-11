import React from "react";
import styles from "./switch.styles.css";

const Switch = (props) => {
  return (
    <>
      <input
        className={styles.switchCheckbox}
        id="switch-input"
        type="checkbox"
        checked={props.checked}
        onChange={props.onChange}
      />
      <label className={styles.switchLabel} htmlFor="switch-input">
        <span className={styles.switchButton} />
      </label>
    </>
  );
};

export default Switch;
