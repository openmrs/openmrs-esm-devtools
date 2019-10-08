import "./set-public-path";
import "./openmrs-backend-dependencies";
import React from "react";
import ReactDOM from "react-dom";
import Root from "./root.component";
import singleSpaReact from "single-spa-react";

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root
});

export const bootstrap = reactLifecycles.bootstrap;
export const mount = reactLifecycles.mount;
export const unmount = reactLifecycles.unmount;
