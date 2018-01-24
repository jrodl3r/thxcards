const express = require('express');
const router = require('express-promise-router')();

const ClientsController = require('../controllers/clients');

const { validateParam, schemas } = require('./routeHelpers');

router.route('/')
  .get(ClientsController.index)
  .post(ClientsController.newClient);

router.route('/import')
  .post(ClientsController.importClients);

router.route('/:clientID')
  .get(validateParam(schemas.idSchema, 'clientID'), ClientsController.getClient)
  .put(validateParam(schemas.idSchema, 'clientID'), ClientsController.replaceClient)
  .patch(validateParam(schemas.idSchema, 'clientID'), ClientsController.updateClient)
  .delete(validateParam(schemas.idSchema, 'clientID'), ClientsController.deleteClient);

module.exports = router;
