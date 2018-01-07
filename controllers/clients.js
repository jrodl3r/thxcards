const Client = require('../models/client');

module.exports = {
  index: async (req, res, next) => {
    const clients = await Client.find({});
    res.status(200).json(clients);
    console.log('Sending Clients: ', clients);
  },

  newClient: async (req, res, next) => {
    const newClient = new Client(req.body);
    const client = await newClient.save();
    res.status(201).json(client);
    console.error('Saved Client: ', client);
  }
};
