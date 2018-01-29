const Client = require('../models/client');

module.exports = {
  index: async (req, res, next) => {
    const clients = await Client.find({});
    res.status(200).json(clients);
    // console.log('Sending Clients: ', clients);
  },

  newClient: async (req, res, next) => {
    const newClient = new Client(req.body);
    const client = await newClient.save();
    res.status(201).json(client);
    // console.log('Saved Client: ', client);
  },

  getClient: async (req, res, next) => {
    const { clientID } = req.params;
    const client = await Client.findById(clientID);
    res.status(200).json(client);
    // console.log('Sending Client: ', client);
  },

  replaceClient: async (req, res, next) => {
    const { clientID } = req.params;
    const client = req.body;
    const result = await Client.findByIdAndUpdate(clientID, client);
    res.status(200).json(client);
    // console.log('Replaced Client: ', client);
  },

  updateClient: async (req, res, next) => {
    const { clientID } = req.params;
    const client = req.body;
    const result = await Client.findByIdAndUpdate(clientID, client);
    res.status(200).json(client);
    // console.log('Updated Client: ', client);
  },

  deleteClient: async (req, res, next) => {
    const { clientID } = req.params;
    const result = await Client.remove({ _id: clientID });
    res.status(200).json({ success: true });
    // console.log('Deleted Client: ', clientID);
  },

  importClients: async (req, res, next) => {
    const newClients = req.body;
    for (const client of newClients) {
      const newClient = new Client(client);
      await newClient.save();
    }
    res.status(200).json({ success: true });
    // console.log(`Imported Clients (${newClients.length})`);
  },

  wipeClients: async (req, res, next) => {
    const count = await Client.count({});
    if (count) { await Client.collection.drop(); }
    res.status(200).json({ success: true });
    // console.log('Deleted Clients');
  }
};
