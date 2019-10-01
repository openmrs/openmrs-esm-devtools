import { openmrsFetch } from "@openmrs/esm-api";
import * as semver from "semver";
import { difference, isEmpty } from "lodash-es";

var installedBackendModules: any[] = [];

const originalOnload = System.constructor.prototype.onload;

System.constructor.prototype.onload = function(err, id, deps) {
  if (!err) {
    System.import(id).then(module => {
      console.log(module);
      if (module.backendDependencies) {
        checkBackendDeps(module.backendDependencies);
      }
    });
  }
  return originalOnload.apply(this, arguments);
};

function checkBackendDeps(backendModules: any) {
  if (!isEmpty(installedBackendModules)) {
    fetchInstalledBackendModules().then(({ data }) => {
      installedBackendModules = data.results;
      checkIfModulesAreInstalled(backendModules);
    });
  } else {
    checkIfModulesAreInstalled(backendModules);
  }
}

function checkIfModulesAreInstalled(requiredBackendModules) {
  const missingOpenmrsBackendModules = getMissingBackendModules(
    requiredBackendModules
  );
  const modulesWithWrongVersionInstalled = getMismatchedVersions(
    requiredBackendModules
  );
  console.error(
    "The following backend modules are required!",
    missingOpenmrsBackendModules
  );
  console.error(
    "The following backend modules versions are required",
    modulesWithWrongVersionInstalled
  );
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
