import React from "react";
import {
  modulesWithMissingBackendModules,
  modulesWithWrongBackendModulesVersion
} from "../openmrs-backend-dependencies";
import styles from "../devtools/import-map.styles.css";
import backendStyles from "./backend-dependencies-style.css";

export default function BackendModule(props: BackendModulesProps) {
  handleBackendModuleErrorToggle(props);
  return (
    <div className={styles.importMap}>
      <div className={backendStyles}>
        <h4>Missing openmrs backend modules</h4>

        {Object.keys(modulesWithMissingBackendModules).map(key => {
          return (
            <table className={backendStyles.backendtable}>
              {modulesWithMissingBackendModules[key].backendModules.length >
                0 && (
                <tr>
                  <tr>
                    <td colSpan={3}>
                      <b>{modulesWithMissingBackendModules[key].moduleName}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Module Name</b>
                    </td>
                    <td>
                      <b>Version</b>
                    </td>
                  </tr>
                  {modulesWithMissingBackendModules[key].backendModules.map(
                    (module: any) => {
                      return (
                        <tr>
                          <td>{module.uuid}</td>
                          <td>{module.version}</td>
                        </tr>
                      );
                    }
                  )}
                </tr>
              )}
            </table>
          );
        })}

        <h4>Modules with wrong versions installed</h4>

        {Object.keys(modulesWithWrongBackendModulesVersion).map(key => {
          return (
            <table className={backendStyles.backendtable}>
              <tr>
                {modulesWithWrongBackendModulesVersion[key].backendModules
                  .length > 0 && (
                  <tr>
                    <tr>
                      <td colSpan={3}>
                        <b>
                          {
                            modulesWithWrongBackendModulesVersion[key]
                              .moduleName
                          }
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td>Module Name</td>
                      <td>Installed Version</td>
                      <td>Required Version</td>
                    </tr>
                    {modulesWithWrongBackendModulesVersion[
                      key
                    ].backendModules.map((module: any) => {
                      return (
                        <tr>
                          <td>{module.uuid}</td>
                          <td>{module.installedVersion}</td>
                          <td>{module.requiredVersion}</td>
                        </tr>
                      );
                    })}
                  </tr>
                )}
              </tr>
            </table>
          );
        })}
      </div>
    </div>
  );
}

function handleBackendModuleErrorToggle(props) {
  if (
    modulesWithMissingBackendModules.length ||
    modulesWithWrongBackendModulesVersion.length
  ) {
    props.toggleOverridden(true);
  }
}

type BackendModulesProps = {
  toggleOverridden(overridden: boolean): void;
};
