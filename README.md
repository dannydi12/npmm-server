<img src="logo" width="15%">

# NPMM - Node Package Manager Manager

## Live App: [NPMM](http://)

<p float="left"><img src="mobile screenshot 1" width="20%">  <img src="mobile screenshot 2" width="20%"> <img src="mobile screenshot 3" width="20%"> <img src="mobile screenshot 4" width="20%"></p>

## Description

NPMM is an app that...

## Notes on Current Features

- The app...

## Features to Come

- A way for users to...

## Getting Started

- Install dependencies: `npm install`
- Create development and test databases: `createdb npmm`, `createdb npmm-test`
- Create database user: `createuser npmm`
- Grant privileges to new user in `psql`:
  - `GRANT ALL PRIVILEGES ON DATABASE npmm TO npmm`
  - `GRANT ALL PRIVILEGES ON DATABASE npmm-test TO npmm`
- Prepare environment file: `cp example.env .env`
- Replace values in `.env` with your custom values.
- Bootstrap development database: `npm run migrate`
- Bootstrap test database: `npm run migrate:test`

## Sample Data

- To seed the database for development: `psql -U npmm -d npmm -a -f seeds/seed.npmm_tables.sql`
- To clear seed data: `psql -U npmm -d npmm -a -f seeds/trunc.npmm_tables.sql`

## Scripts

- Start application for development: `npm run dev`
- Run tests: `npm test`

## Built With

[PostgreSQL](https://www.postgresql.org/)

[Express](https://expressjs.com/)

[React](https://reactjs.org/)

[Node](https://nodejs.org/en/)

HTML 5

CSS 3

Javascript

[Mocha](https://mochajs.org/)

[Chai](https://www.chaijs.com/)

[Knex](http://knexjs.org/)

## Authors

- **Daniel Di Venere** - [Portfolio](https://)
- **Josh Young** - [Portfolio](https://joshyoung.net)
- **Matthew Malecki** - [Portfolio](https://)
- **Michael Ploughman** - [Portfolio](https://)
- **Vik Birdi** - [Portfolio](https://)

## License

This project is licensed under the MIT License
