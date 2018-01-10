const express = require('express');
const router = require('express-promise-router')();

const HistoryController = require('../controllers/history');

router.route('/')
  .get(HistoryController.index)
  .post(HistoryController.newItem);

router.route('/:historyID')
  .get(HistoryController.getItem)
  .put(HistoryController.replaceItem)
  .patch(HistoryController.updateItem);

module.exports = router;
