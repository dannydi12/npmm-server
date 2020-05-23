# NPMM Server

[![CodeFactor](https://www.codefactor.io/repository/github/dannydi12/npmm-server/badge)](https://www.codefactor.io/repository/github/dannydi12/npmm-server)

ThoughtBin allows users to anonymously share and create content on a simple and frictionless micro-platform. Think of it as a privacy-centric Twitter with a hint of 4Chan. A live demo can be found at [https://npmm.dev/](https://npmm.dev/)

## Summary

This API provides the means to create, delete, and update collections and with those collections you can add npm packages.

## Motivation

## NPMM CLI

Make sure to check out our companion CLI that allows you to install your collections from NPMM in your local project: [NPMM CLI](https://github.com/maleckim/npmm-cli).

## Installation

#### `npm install`

Installs all the required dependencies. Run this before anything else.

#### `npm run migrate`

Uses postgrator to create required tables. Create a database and edit `postgrator-config.js` before running this command.

#### `npm run dev`

Runs the app in the development mode.

#### `npm test`

Launches Mocha.

#### `npm start`

Launches the server at the port specified in your `.env` file.

## Configuration

Make sure to go to `[npmm-folder-name]/example.env` , rename it to `.env`, and then enter your configuration details (port, Postgres database URL, etc)

**The front-end repository can be found [here](https://github.com/dannydi12/npmm-client).**

## Usage

### Open Endpoints

Open endpoints require no authentication.

- [Get Token](docs/token.md) : `POST /token` - Get a token for subsequent authorized requests
- [Get Thoughts](docs/thoughts/get.md) : `GET /thoughts/` - Get 10 thoughts at any given index

### Endpoints that require Authentication

Basic CRUD operations in regard to collections.

- [Get All of the User Collections](docs/collections/get.md) : `GET /collections`
- [Create a User Collection](docs/collections/post.md) : `POST /collections`
- [Get a Specific User Collection](docs/collections/id/get.md) : `GET /collections/:id`
- [Update a User Collection](docs/collections/id/patch.md) : `PATCH /collections/:id`
- [Delete a User Collection](docs/collections/id/delete.md) : `DELETE /collections/:id`

## Built With

#### Back-end:

- Node
- PostgreSQL
- Knex
- JSON Web Token
- Express
- Mocha, and Chai
- Deployed with Heroku

#### Front-end:

- React
- HTML5
- CSS3
- Javascript
- JSON Web Token
- Redux
- Jest
- Deployed with Zeit

## Demo

- [Live Demo](https://npmm.dev/)

## Authors

- **Daniel Di Venere** - [Portfolio](https://)
- **Josh Young** - [Portfolio](https://joshyoung.net)
- **Matthew Malecki** - [Portfolio](https://)
- **Michael Ploughman** - [Portfolio](https://)
- **Vik Birdi** - [Portfolio](https://)

## License

This project is licensed under the MIT License
