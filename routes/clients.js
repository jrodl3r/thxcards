const express = require('express');
const router = require('express-promise-router')();

const ClientsController = require('../controllers/clients');

router.route('/')
  .get(ClientsController.index)
  .post(ClientsController.newClient);

module.exports = router;
