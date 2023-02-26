# npmm Server - *n*ode *p*ackage *m*anager *m*anager

<img src="https://npmm.dev/static/media/npmm-logo.f26fefbb.svg" width="50%">

## Live App @ [npmm](https://npmm.dev)

## CLI Tool @ [Github](https://github.com/maleckim/npmm-cli)

## Client side code @ [Github](https://github.com/dannydi12/npmm-client)

[![CodeFactor](https://www.codefactor.io/repository/github/dannydi12/npmm-server/badge)](https://www.codefactor.io/repository/github/dannydi12/npmm-server)

<p float="left"><img src="http://npmm.dev/npmm-screenshot-landing.png" width="20%"><img src="http://npmm.dev/npmm-screenshot-menu.png" width="20%"><img src="http://npmm.dev/npmm-screenshot-login.png" width="20%"><img src="http://npmm.dev/npmm-screenshot-search.png" width="20%"><img src="http://npmm.dev/npmm-screenshot-package.png" width="20%"></p>

## Description

NPMM allows developers to frictionlessly browse and save npm packages. Saved packages can then be programmatically installed with our command line interface. Imagine the [npmjs.com](https://npmjs.com) website but with a few extra features for ease of use. A live demo can be found at [https://npmm.dev/](https://npmm.dev/)

## Summary

This API provides the means to create, delete, and update collections/packages.

## NPMM CLI

Make sure to check out our companion CLI that allows you to install your collections from NPMM in your local project: **[NPMM CLI](https://github.com/maleckim/npmm-cli)**.

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

- [Sign In](docs/token.md) : `POST /api/auth/login` - Get a token for subsequent authorized requests
- [Sign Up](docs/users/post.md) : `POST /api/users` - Get a token for subsequent authorized requests

### Endpoints that require Authentication

CRUD operations in regard to collections:

- [Get All of the User Collections](docs/collections/get.md) : `GET /api/collections`
- [Create a User Collection](docs/collections/post.md) : `POST /api/collections`
- [Get a Specific User Collection](docs/collections/id/get.md) : `GET /api/collections/:id`
- [Update a User Collection](docs/collections/id/patch.md) : `PATCH /api/collections/:id`
- [Delete a User Collection](docs/collections/id/delete.md) : `DELETE /api/collections/:id`

CRUD operations in regard to packages:

- [Add a New Package](docs/packages/post.md) : `POST /api/packages`
- [Delete a Package](docs/packages/id/delete.md) : `DELETE /api/packages/:id`

## Built With

#### Back-end:

- Node
- PostgreSQL
- Knex
- JSON Web Token
- Express
- Mocha and Chai
- Deployed with Railway.app

#### Front-end:

- React
- HTML5
- CSS3
- Javascript
- JSON Web Token
- Redux
- Jest
- Deployed with Vercel

## Demo

- [Live Demo](https://npmm.dev/)

## The Authors

- **Vik Birdi** - [Portfolio](https://vikbirdi.com)
- **Daniel Di Venere** - [Portfolio](https://imdan.io/)
- **Matthew Malecki** - [Portfolio](https://portfolio.maleckim.now.sh/)
- **Michael Ploughman** - [Portfolio](https://MichaelHPloughman.com)
- **Josh Young** - [Portfolio](https://joshyoung.net)

## Acknowledgments

- [npms.io](https://npms.io) - An awesome elastic-search API for npm
- [npm](https://npmjs.com) - Only the best package manager ever

## License

This project is licensed under the MIT License
