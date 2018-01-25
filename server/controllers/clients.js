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
    // req.body must contain all fields
    const { clientID } = req.params;
    const newClient = req.body;
    const result = await Client.findByIdAndUpdate(clientID, newClient);
    res.status(200).json({ success: true });
    // console.log('Replaced Client: ', clientID);
  },

  updateClient: async (req, res, next) => {
    // req.body can contain any number of fields
    const { clientID } = req.params;
    const newClient = req.body;
    const result = await Client.findByIdAndUpdate(clientID, newClient);
    res.status(200).json({ success: true });
    // console.log('Updated Client: ', clientID);
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
    await Client.collection.drop();
    res.status(200).json({ success: true });
    // console.log('Deleted Clients');
  }
};
