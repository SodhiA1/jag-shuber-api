# Sheriff Scheduling API
This project represents the API for the Sheriff Scheduling (Shuber) application.

### [Project Architecture Documentation](./docs/index)

> TODO: NEED TO UPDATE THESE DOCS.  TALK TO COLTER FOR NOW.

## Commands 


`yarn watch` - Launches the backend in dev mode against the development database
`yarn watch:testing` - Launches the backend in testing mode (wired to the testing database)
`yarn test` - runs the jest tests for the application (should be done in conjuction with the `yarn watch:testing` command described above)


## Technology Stack Used

- Openshift
- Postgres
- nodejs
- koa
- tsoa

## Getting Started

- Deploy backend
- postgres ingress port
- setup .env file

## Deployment (OpenShift)

See [openshift/Readme.md](openshift/Readme.md)

## How to Contribute

If you would like to contribute, please see our [CONTRIBUTING](CONTRIBUTING.md) guidelines.

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). 
By participating in this project you agree to abide by its terms.

## License

    Copyright 2016 Province of British Columbia

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
