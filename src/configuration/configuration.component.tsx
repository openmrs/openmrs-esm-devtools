import React from "react";
import { getDevtoolsConfig } from "@openmrs/esm-module-config";
import { isOverriddenInImportMap } from "../devtools/import-map.component";

import styles from "../devtools/import-map.styles.css";

function Configuration(props: ConfigurationProps) {
  const [config, setConfig] = React.useState({});

  React.useEffect(() => {
    getDevtoolsConfig().then(res => setConfig(res));
  }, []);

  const configString = JSON.stringify(config, null, 2);

  return (
    <div className={styles.importMap}>
      <pre>
        <code>{configString}</code>
      </pre>
    </div>
  );
}

type ConfigurationProps = {
  toggleOverridden(overridden: boolean): void;
};

function Fallback() {
  return (
    <div className={styles.importMap}>
      The Configuration panel cannot be used while @openmrs/esm-module-config is
      overridden.
    </div>
  );
}

const ConfigurationOrFallback = isOverriddenInImportMap(
  "@openmrs/esm-module-config"
)
  ? Fallback
  : Configuration;

export default ConfigurationOrFallback;
