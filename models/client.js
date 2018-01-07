const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  name: String,
  address: String
});

const Client = mongoose.model('client', clientSchema);

module.exports = Client;
