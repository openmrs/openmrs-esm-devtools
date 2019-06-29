import React, { useState, useEffect } from "react";
import { ClassNames } from "@emotion/core";
import DevToolsPopup from "./devtools-popup.component";

export default function Root(props) {
  const [devToolsOpen, setDevToolsOpen] = useState(false);
  const [isOverridden, setIsOverridden] = useState(
    (window as any).importMapOverrides.hasOverrides
  );

  return (
    <>
      <ClassNames>
        {({ css, cx }) => (
          <div
            role="button"
            tabIndex={0}
            onClick={toggleDevTools}
            className={cx(css`
              z-index: 100000;
              background-color: ${isOverridden
                ? "salmon"
                : "navajowhite"} !important;
              height: 40px !important;
              width: 40px !important;
              top: 10px;
              left: 8px;
              position: fixed;
              border-radius: 2px;
            `)}
          />
        )}
      </ClassNames>
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
