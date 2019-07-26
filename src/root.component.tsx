import React from "react";
import Devtools from "./devtools/devtools.component";

export default class Root extends React.Component<RootProps, RootState> {
  state = {
    catastrophicError: false
  };
  render() {
    return this.state.catastrophicError ? null : <Devtools />;
  }
  componentDidCatch() {
    alert("@openmrs/devtools is dead. Whoops");
    this.setState({ catastrophicError: true });
  }
}

type RootProps = {};

type RootState = {
  catastrophicError: boolean;
};
