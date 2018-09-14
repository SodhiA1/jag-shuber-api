## OpenShift configuration files

Some scripts have been created to ease the development workflow when deploying things in your own development environment.  These aren't used in pathfinder as we typically import `json` template files directly.


# Scripts 

## Setup Local Dev Environment
This document assumes that you already have minishift setup and running.

> `setup-dev-environments.sh`
>
> Sets up the entire tools, dev, test projects and populates them with the appropriate builds and deployments.  This script will effectively get you up and running with the entire backend stack.  It will also generate `.env` files on behalf of the `dev` and `test` environments.  You will just need to fill in the database secrets, which it gives links to in the command line output.

## Support

> `functions.sh`
>
> Importable collection of useful shell functions for setting up development environments.

### Legacy Scripts
These scripts are still useful, however you should be able to get up and running with the script described above.

> `create-oc-api-builds.sh`
>
> Creates the builds / pipelines for the api (Should be run in tools project)
  
> `deploy-oc-api.sh`
>
> This command selects the current api pod and runs the `deploy-db.sh` script inside it.  It will prompt for inputs, but this command is running **INSIDE** of the `api` pod.

## Extracting Audit Data

An interactive scripts has been written to assist in extracting audit data from the running instances in any of the environments.  This can be done by using the following script and following the prompts:

`./extract-audit-data.sh`

This will place all of the exported audit data into a folder called `database-audit-data` and will be prefixed by the openshift project that it was exported from.

The data is in `csv` format for easier consumption by other analysis applications.
