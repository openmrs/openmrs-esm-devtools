import React from "react";

export function useDevelopmentReact() {
  React.useEffect(() => {
    if (!localStorage.getItem("prod-react")) {
      const reactUrl = System.resolve("react");
      const reactDOMUrl = System.resolve("react-dom");
      // @ts-ignore
      window.importMapOverrides.addOverride(
        "react",
        reactUrl.replace("production.min", "development")
      );
      // @ts-ignore
      window.importMapOverrides.addOverride(
        "react-dom",
        reactDOMUrl.replace("production.min", "development")
      );
    }
  }, [localStorage.getItem("prod-react")]);
}
