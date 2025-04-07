<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

​The "Dentist Appointment Web" repository is a server-side application developed using the NestJS framework, which is built with TypeScript and Node.js. This backend service is designed to manage dental appointments, providing APIs for appointment scheduling, patient management, and related functionalities.​

##Features
Appointment Management: APIs to create, update, delete, and retrieve dental appointments.​
Patient Records: Endpoints to manage patient information securely.​
Authentication and Authorization: Implements user authentication and role-based access control.​

##Technology Stack
Backend Framework: NestJS (Node.js with TypeScript)​
Testing: Configured testing environment (specific framework not specified)​
Deployment: Configured for deployment on Vercel, as indicated by the vercel.json file.​

##Project Structure
```bash
    src/: Contains the main source code for the NestJS application, including modules, controllers, and services.​
    test/: Holds test files for the application.​
    .gitignore: Specifies files and directories to be ignored by Git.​
    .prettierrc: Configuration file for Prettier code formatter.​
    eslint.config.mjs: Configuration file for ESLint.​
    nest-cli.json: NestJS CLI configuration file.​
    package.json: Lists project dependencies and scripts.​
    tsconfig.json & tsconfig.build.json: TypeScript configuration files.​
    vercel.json: Configuration file for deployment on Vercel.​
```

##Installation and Setup
To set up the project locally:
Clone the Repository:
 ```bash
  $ git clone https://github.com/jairizesp/dentist-appointment-web.git
```

##Navigate to the Project Directory:
```bash
  $ cd dentist-appointment-web
```

##Install Dependencies:
```bash
  $ npm install
```

##Start the Development Server:
```bash
  $ npm run start:dev
```
The application will be running at http://localhost:3000 by default.

##Deployment
The presence of the vercel.json file suggests that the project is configured for deployment on Vercel. To deploy:​

Install Vercel CLI: 
```bash
 $ npm install -g vercel
```

#Deploy the Application: 
vercel
Follow the prompts to complete the deployment process.

##Contributing
Contributions to the project are welcome. To contribute:​

Fork the Repository.

Create a New Branch:
```bash
  $ git checkout -b feature-name
```

Make Your Changes.

Commit and Push: 
```bash
  $ git commit -m "Description of changes"
  $ git push origin feature-name
```
Create a Pull Request.

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
