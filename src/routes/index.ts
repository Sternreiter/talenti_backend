import express from 'express'
const app = express();

app.use(require('./user'));
app.use(require('./supermarket'));
app.use(require('./product'));
app.use(require('./status'));

module.exports = app;