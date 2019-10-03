import { openmrsFetch } from "@openmrs/esm-api";
import * as semver from "semver";
import { difference, isEmpty } from "lodash-es";

var installedBackendModules: any[] = [];

const originalOnload = System.constructor.prototype.onload;

System.constructor.prototype.onload = function(err, id, deps) {
  const moduleName = id.substring(id.lastIndexOf("/") + 1, id.indexOf(".js"));
  if (!err) {
    System.import(id)
      .then(response => {
        const module = Object.assign({ moduleName }, response);
        if (module.backendDependencies) {
          checkBackendDeps(module);
        }
      })
      .catch(err => {
        setTimeout(() => {
          throw err;
        });
      });
  }
  return originalOnload.apply(this, arguments);
};

function checkBackendDeps(module: any) {
  if (isEmpty(installedBackendModules)) {
    fetchInstalledBackendModules()
      .then(({ data }) => {
        installedBackendModules = data.results;
        checkIfModulesAreInstalled(module);
      })
      .catch(err => {
        setTimeout(() => {
          throw err;
        });
      });
  } else {
    checkIfModulesAreInstalled(module);
  }
}

function checkIfModulesAreInstalled(module) {
  const requiredBackendModules = module.backendDependencies;
  const missingOpenmrsBackendModules = getMissingBackendModules(
    requiredBackendModules
  );
  const modulesWithWrongVersionInstalled = getMismatchedVersions(
    requiredBackendModules
  );

  //TODO: replace this with tab on devtools ui
  if (!isEmpty(missingOpenmrsBackendModules)) {
    console.error(
      `${module.moduleName} requires the following backend modules:`,
      missingOpenmrsBackendModules
    );
  }
  if (!isEmpty(modulesWithWrongVersionInstalled)) {
    console.error(
      `${module.moduleName} requires the following backend module versions:`,
      modulesWithWrongVersionInstalled
    );
  }
}

function getMissingBackendModules(requiredBackendModules) {
  const requiredBackendModulesUuids = Object.keys(requiredBackendModules);
  const installedBackendModuleUuids = installedBackendModules.map(
    res => res.uuid
  );
  return difference(requiredBackendModulesUuids, installedBackendModuleUuids);
}

function getMismatchedVersions(requiredBackendModules) {
  const mismatchedModuleVersions: MismatchedModuleVersion[] = [];
  for (let uuid in requiredBackendModules) {
    const requiredVersion = requiredBackendModules[uuid];
    const installedVersion = installedBackendModules.find(
      module => module.uuid === uuid
    )["version"];
    if (!isVersionInstalled(requiredVersion, installedVersion)) {
      mismatchedModuleVersions.push({
        uuid,
        requiredVersion,
        installedVersion
      });
    }
  }
  return mismatchedModuleVersions;
}

function fetchInstalledBackendModules() {
  return openmrsFetch(`/ws/rest/v1/module?v=custom:(uuid,version)`, {
    method: "GET"
  });
}

function isVersionInstalled(requiredVersion, installedVersion) {
  return semver.eq(
    semver.coerce(requiredVersion),
    semver.coerce(installedVersion)
  );
}

type MismatchedModuleVersion = {
  uuid: string;
  requiredVersion: string;
  installedVersion: string;
};
