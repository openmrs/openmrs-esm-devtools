import { openmrsFetch } from "@openmrs/esm-api";
const semver = require("semver");
import backEndDeps from "../backEndDeps.json";

export function fetchBackendDeps() {
  return openmrsFetch(`/ws/rest/v1/module?v=custom:(uuid,version)`, {
    method: "GET"
  });
}

export function checkBackendDeps(dependency: any) {
  fetchBackendDeps().then(({ data }) => {
    let foundDependecies: any[] = [];
    for (let [uuid] of Object.entries(dependency)) {
      let found = false;
      data.results.map(element => {
        if (element.uuid === uuid) {
          found = true;
          foundDependecies.push(element);
        }
      });
      if (!found) {
        throw Error(`${uuid} backend end module not supported`);
      }
    }

    for (let [uuid, version] of Object.entries(dependency)) {
      foundDependecies.map(backEndDeps => {
        if (uuid === backEndDeps.uuid) {
          if (
            !semver.eq(
              semver.coerce(version),
              semver.coerce(backEndDeps.version)
            )
          ) {
            throw Error(`version do not match for ${backEndDeps.uuid}`);
          }
        }
      });
    }
  });
}
const originalOnload = System.constructor.prototype.onload;
System.constructor.prototype.onload = function(err, deps) {
  if (!err) {
    checkBackendDeps(backEndDeps);
  }
  return originalOnload.apply(this, arguments);
};
