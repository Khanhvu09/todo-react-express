var express = require('express');
var router = express.Router();

/* GET home page. */
const mysql = require('mysql');
const config = require('../config')
const connection = mysql.createConnection(config);
connection.connect()

router.post('/addTask', (req, res)=>{
	const taskName = req.body.taskName
	const taskDate = req.body.taskDate
	res.json({taskName, taskDate})
})

module.exports = router;
