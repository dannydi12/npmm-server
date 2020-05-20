require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const { NODE_ENV } = require('../config');
const authRoute = require('./auth/auth-router');
const collectionsRoute = require('./collections/collections-route');
const packagesRoute = require('./packages/packages-route');
const usersRoute = require('./users/users-route');

const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(compression());
app.use((error, req, res, next) => {
  response = { message: error.message, error };
  res.status(500).send(response);
});

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/collections', collectionsRoute);
app.use('/api/packages', packagesRoute);

module.exports = app;
