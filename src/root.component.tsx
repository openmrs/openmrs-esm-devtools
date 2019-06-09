import React from "react";

export default class Root extends React.Component<RootProps, RootState> {
  state = {
    catastrophicError: false
  };
  render() {
    return this.state.catastrophicError ? null : <div>Hi</div>;
  }
  componentDidCatch() {
    this.setState({ catastrophicError: true });
  }
}

type RootProps = {};

type RootState = {
  catastrophicError: boolean;
};
