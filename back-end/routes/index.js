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
	const insertQuery = `INSERT INTO tasks(taskName,taskDate)
		VALUES (?,?)`;
		connection.query(insertQuery,[taskName,taskDate],(error, results)=>{
			if (error){throw error}
			const getTasksQuery = `SELECT * FROM tasks`
			connection.query(getTasksQuery,(error2, results2)=>{
				if (error2){throw error2};
				res.json(results2)
			})
		})
	// res.json({taskName, taskDate})
})

router.get('/getTask', (req, res)=>{
	const getTasksQuery = `SELECT * FROM tasks`
	connection.query(getTasksQuery,(error, result)=>{
		if(error){throw error}
		res.json(result)
	})
})

router.get('/getTask/:tid', (req, res)=>{
	const tid = req.params.tid;
	const taskName = req.body.taskName
	const taskDate = req.body.taskDate
	const getTasksQuery = `SELECT * FROM tasks WHERE id = ?`;
	connection.query(getTasksQuery,[tid],(error, result)=>{
		if (error){throw error}
		res.json(result)
	})
})

module.exports = router;
