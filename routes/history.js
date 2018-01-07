const express = require('express');
const router = require('express-promise-router')();

const HistoryController = require('../controllers/history');

router.route('/')
  .get(HistoryController.index)
  .post(HistoryController.newItem);

module.exports = router;
