import express from 'express'
const app = express();
import user from './user';
import product from './product';
import supermarket from './supermarket';
import status from './status';

app.use(user)
app.use(product)
app.use(supermarket)
app.use(status)

module.exports = app;