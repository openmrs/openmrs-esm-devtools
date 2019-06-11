# openmrs-esm-devtools

[![Build Status](https://travis-ci.org/openmrs/openmrs-esm-devtools.svg?branch=master)](https://travis-ci.org/openmrs/openmrs-esm-devtools)

An in-browser javascript module that helps developers view and configure OpenMRS frontend

## Running

After cloning or downloading this repo to your computer:

* Install modules by running:
`npm install`

* Run:
`npm start -- --port <PORT>`

## Development

In order to contribute to openmrs-esm-devtools without installing a local instance of OpenMRS, there's need to replace the url of openmrs-esm-devtools in the import map of the remote OpenMRS instance, to the one running locally on your computer. This can be achieved using [importMapOverrides](https://www.npmjs.com/package/import-map-overrides).

However, the setup depends on whether or not the remote OpenMRS instance is running behind HTTPS:

1. **Remote OpenMRS instance running with just HTTP**
For this development workflow, after running `npm install` and `npm start -- --port <PORT>`, simply open the OpenMRS Single SPA default page on your browser, then open the console and key in:
`importMapOverrides.addOverride('@openmrs/devtools','https://localhost:<PORT>/devtools.js');`

2. **Remote OpenMRS instance running behind HTTPS**

For this setup, it is required to add a browser exception to allow invalid certificates for resources loaded from localhost. For Chrome browsers, make sure to enable the flag `chrome://flags/#allow-insecure-localhost`. For Firefox, open the url `https://localhost:<PORT>` and add an exception for the certificate.

And finally use the new alias:
`npm run start-https -- --port <PORT>`