import React from "react";
import Root from "./root.component";
import { shallow } from "enzyme";

describe(`<Root />`, () => {
  it(`renders without dying`, () => {
    shallow(<Root />);
  });
});
