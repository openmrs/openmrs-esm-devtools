import "./set-public-path";

function setupOpenMRS() {
  return {
    lifecycle: () => import("./openmrs-esm-devtools"),
    activate: () => !localStorage.getItem("openmrs:devtools"),
  };
}

export { setupOpenMRS };
