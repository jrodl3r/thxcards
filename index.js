const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');

const clients = require('./routes/clients');
const employees = require('./routes/employees');
const history = require('./routes/history');

const app = express();

// Connect
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/thxcards';
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, (err, res) => {
  if (err) console.log('Error Connecting to: ' + mongoURI + '. ' + err);
  else console.log('Connected to ' + mongoURI);
});

// Middlewares
if (process.env.NODE_ENV === 'development') app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/api/clients', clients);
app.use('/api/employees', employees);
app.use('/api/history', history);

// Static
app.use(express.static(path.join(__dirname, 'client/build')));

// Catch All
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// Go
const port = process.env.PORT || 5000;
app.listen(port);

console.log(`ThxCards listening on ${port}`);
