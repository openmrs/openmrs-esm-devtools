import React from "react";
import "./switch.styles.css";

const Switch = (props) => {
  return (
    <>
      <input
        className="switch-checkbox"
        id="switch-input"
        type="checkbox"
        onChange={this.onChange}
      />
      <label className="switch-label" htmlFor={`switch-input`}>
        <span className={`switch-button`} />
      </label>
    </>
  );
};

export default Switch;
