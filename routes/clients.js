const express = require('express');
const router = require('express-promise-router')();

const ClientsController = require('../controllers/clients');

router.route('/')
  .get(ClientsController.index)
  .post(ClientsController.newClient);

router.route('/:clientID')
  .get(ClientsController.getClient)
  .put(ClientsController.replaceClient)
  .patch(ClientsController.updateClient);

module.exports = router;
