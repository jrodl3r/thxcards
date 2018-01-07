const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema({
  list: Array
});

const History = mongoose.model('history', historySchema);

module.exports = History;
