function setupOpenMRS() {
  return {
    lifecycle: () => import("./openmrs-esm-devtools"),
    activate: () => !!localStorage.getItem("openmrs:devtools"),
  };
}

const importTranslation = () => Promise.resolve();

export { importTranslation, setupOpenMRS };
