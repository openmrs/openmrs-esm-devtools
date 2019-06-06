# openmrs-esm-devtools

[![Build Status](https://travis-ci.org/openmrs/openmrs-esm-devtools.svg?branch=master)](https://travis-ci.org/openmrs/openmrs-esm-devtools)

An in-browser javascript module that helps developers view and configure OpenMRS frontend

## Running

After cloning or downloading this repo to your computer:

* Install modules by running:
`npm install`

* Run:
`npm start <PORT>`

## Development

In order to contribute to openmrs-esm-devtools without installing a local instance of OpenMRS, there's need to replace the url of openmrs-esm-devtools in the import map of the remote OpenMRS instance, to the one running locally on your computer. This can be achieved using [importMapOverrides](https://www.npmjs.com/package/import-map-overrides).

However, the setup depends on whether or not the remote OpenMRS instance is running behind HTTPS:

1. **Remote OpenMRS instance running with just HTTP**
For this development workflow, after running `npm install` and `npm start <PORT>`, simply open the OpenMRS Single SPA default page on your browser, then open the console and key in:
`importMapOverrides.addOverride('@openmrs/devtools','https://localhost:<PORT>/devtools.js');`

2. **Remote OpenMRS instance running behind HTTPS**
This setup involves generating a root certificate locally as described in this [gist](https://gist.github.com/blittle/a9c74f43a5cec05cd6797b51f2f1b52d) and getting the remote instance to trust the generated certificate. After creating the root certificate as described in the gist above, you'll have two files: *key.pem* and *public.pem*

If your browser doesn't trust the certificate, add an exception to allow invalid certificates for resources loaded from localhost.

The next step is to create a bash [alias](https://davidwalsh.name/alias-bash) in order to start the webpack-dev-server with https. Add this line to your .bashrc:
`alias npm-start-https='webpack-dev-server --https --key=$1 --cert=$2 --port`

Then run:
`source ~/.bashrc`

And finally use the new alias:
`npm-start-https <PATH>/key.pem <PATH>/public.pem <PORT>`