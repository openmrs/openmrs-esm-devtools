import React, { useState, useEffect } from "react";
import DevToolsPopup from "./devtools-popup.component";
import styles from "./devtools.styles.css";
import { a, m } from "kremling";

export default function Root(props) {
  const [devToolsOpen, setDevToolsOpen] = useState(false);
  const [isOverridden, setIsOverridden] = useState(
    (window as any).importMapOverrides.hasOverrides
  );

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={toggleDevTools}
        className={a(styles.devtoolsTriggerButton).m(
          styles.overridden,
          isOverridden
        )}
      />
      {devToolsOpen && (
        <DevToolsPopup
          close={toggleDevTools}
          toggleOverridden={toggleOverridden}
        />
      )}
    </>
  );

  function toggleDevTools() {
    setDevToolsOpen(!devToolsOpen);
  }

  function toggleOverridden(overridden) {
    setIsOverridden(overridden);
  }
}
