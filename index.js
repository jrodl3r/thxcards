const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Use body-parser as middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/msg', (req, res) => {
  console.log('Message received: ' + req.body.msg);
  res.end('yes');
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Clients
app.get('/api/clients', (req, res) => {
  const count = 5;
  const clients = [
    {name: 'Fox', address: '1523 Fooseball Ln'},
    {name: 'NBC', address: '564 South Street'},
    {name: 'ABC', address: '814 Main Street'},
    {name: 'CBS', address: '43 North Shore Blvd'},
    {name: 'ESPN', address: '1245 Rodgers Place'}];
  res.json(clients);
  console.log(`Sent ${count} client items`);
});

// Employees
app.get('/api/employees', (req, res) => {
  const count = 5;
  const employees = [
    {name: 'Bob Watson', email: 'bob@lightspeedvt.com'},
    {name: 'Steve Moritzi', email: 'steve@lightspeedvt.com'},
    {name: 'Barbara Cornel', email: 'barb1@lightspeedvt.com'},
    {name: 'Diana Strum', email: 'diana@lightspeedvt.com'},
    {name: 'Alan Watts', email: 'awatts@lightspeedvt.com'}];
  res.json(employees);
  console.log(`Sent ${count} employee items`);
});

// History
app.get('/api/history', (req, res) => {
  const history = [
    {list: 'list'}];
  res.json(history);
  console.log(`Sent history`);
});

// Catch unmatched requests, send back React's index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`ThxCards listening on ${port}`);
