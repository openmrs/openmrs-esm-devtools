import React from "react";
import { css } from "@emotion/core";

export default function ImportMap(props: ImportMapProps) {
  const importMapListRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    window.addEventListener(
      "import-map-overrides:change",
      handleImportMapChange
    );
    return () =>
      window.removeEventListener(
        "import-map-overrides:change",
        handleImportMapChange
      );

    function handleImportMapChange(evt) {
      props.toggleOverridden((window as any).importMapOverrides.hasOverrides());
    }
  }, [importMapListRef.current]);

  return (
    <div
      css={css`
        width: 100%;
        margin-top: 64px;
      `}
    >
      <import-map-overrides-list
        ref={importMapListRef}
      ></import-map-overrides-list>
    </div>
  );
}

type ImportMapProps = {
  toggleOverridden(overridden: boolean): void;
};
