import React from "react";
import Devtools from "./devtools/devtools.component";
import openmrsRootDecorator from "@openmrs/react-root-decorator";

function Root(props) {
  return <Devtools {...props} />;
}

export default openmrsRootDecorator({
  featureName: "devtools",
  moduleName: "@openmrs/esm-devtools-app",
})(Root);
