const express = require('express');
const mongoose = require('mongoose');
const basicAuth = require('express-basic-auth');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');

const clients = require('./routes/clients');
const employees = require('./routes/employees');
const history = require('./routes/history');

const app = express();

// Middlewares
if (process.env.NODE_ENV === 'development') app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static
app.use(express.static(path.join(__dirname, 'client/build')));

// Routes
app.use('/api/clients', clients);
app.use('/api/employees', employees);
app.use('/api/history', history);

// Auth
if (process.env.NODE_ENV !== 'development') app.use(basicAuth({ users: { 'admin': 'lsvt' } })); // TODO: Make ENV Variable

// Connect
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/thxcards');

// Catch
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// Go
const port = process.env.PORT || 5000;
app.listen(port);

console.log(`ThxCards listening on ${port}`);
