const Router = require('express');
const databaseController = require('../Controller/databaseController');

const database = Router();


database.get('/records', databaseController.getAllRecords);


module.exports = database;