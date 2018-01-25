const History = require('../models/history');

module.exports = {
  index: async (req, res, next) => {
    const history = await History.find({});
    res.status(200).json(history);
    // console.log('Sending History: ', history);
  },

  newItem: async (req, res, next) => {
    const newItem = new History(req.body);
    const item = await newItem.save();
    res.status(201).json(item);
    // console.log('Saved History Item: ', item);
  },

  getItem: async (req, res, next) => {
    const { historyID } = req.params;
    const item = await History.findById(historyID);
    res.status(200).json(item);
    // console.log('Sending History Item: ', item);
  },

  replaceItem: async (req, res, next) => {
    const { historyID } = req.params;
    const newItem = req.body;
    const result = await History.findByIdAndUpdate(historyID, newItem);
    res.status(200).json({ success: true });
    // console.log('Replaced History Item: ', historyID);
  },

  updateItem: async (req, res, next) => {
    const { historyID } = req.params;
    const newItem = req.body;
    const result = await History.findByIdAndUpdate(historyID, newItem);
    res.status(200).json({ success: true });
    // console.log('Updated History Item: ', historyID);
  },

  wipeHistory: async (req, res, next) => {
    await History.collection.drop();
    res.status(200).json({ success: true });
    // console.log('Deleted History');
  }
};
