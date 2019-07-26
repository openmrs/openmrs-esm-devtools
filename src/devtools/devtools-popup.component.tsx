import React from "react";
import { css } from "@emotion/core";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import ImportMap from "./import-map.component";
import "@reach/tabs/styles.css";

export default function DevToolsPopup(props: DevToolsPopupProps) {
  return (
    <div
      css={css`
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50%;
        z-index: 100000;
        background-color: black;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        box-sizing: border-box;
        font-family: sans serif;
        overflow-y: auto;
      `}
    >
      <Tabs style={{ width: "100%" }}>
        <TabList
          style={{
            position: "fixed",
            height: "64px",
            width: "100%",
            zIndex: 1000,
            backgroundColor: "black"
          }}
        >
          <Tab>Import Map</Tab>
        </TabList>
        <TabPanels style={{ padding: "24px" }}>
          <TabPanel>
            <ImportMap toggleOverridden={props.toggleOverridden} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <div
        css={css`
          position: absolute;
          right: 24px;
          top: 16px;
          display: flex;
          z-index: 1000;
        `}
      >
        <div
          role="button"
          tabIndex={0}
          onClick={props.close}
          css={css`
            cursor: pointer;
          `}
        >
          {"\u24e7"}
        </div>
      </div>
    </div>
  );
}

type DevToolsPopupProps = {
  close(): void;
  toggleOverridden(isOverridden: boolean): void;
};
