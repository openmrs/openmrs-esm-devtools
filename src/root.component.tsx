import React from "react";
import Devtools from "./devtools/devtools.component";
import openmrsRootDecorator from "@openmrs/react-root-decorator";
import { useDevelopmentReact } from "./use-development-react.hook";

function Root(props) {
  useDevelopmentReact();

  return <Devtools {...props} />;
}

export default openmrsRootDecorator({ featureName: "devtools" })(Root);

type RootProps = {};
