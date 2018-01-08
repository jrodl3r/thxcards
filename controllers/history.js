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
  }
};
