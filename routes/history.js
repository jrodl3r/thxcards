const express = require('express');
const router = require('express-promise-router')();

const HistoryController = require('../controllers/history');

const { validateParam, schemas } = require('./routeHelpers');

router.route('/')
  .get(HistoryController.index)
  .post(HistoryController.newItem);

router.route('/:historyID')
  .get(validateParam(schemas.idSchema, 'historyID'), HistoryController.getItem)
  .put(validateParam(schemas.idSchema, 'historyID'), HistoryController.replaceItem)
  .patch(validateParam(schemas.idSchema, 'historyID'), HistoryController.updateItem);

module.exports = router;
