var express = require('express');
var router = express.Router();
var ctrl = require('./controller');

router
	.route('/')
	// Get all tasks
	.get(ctrl.all)
	// Create new task/tasks
	.post(ctrl.create)
	// Remove all tasks
	.delete(ctrl.rmAll);

router
	.route('/:id')
	// Get one task
	.get(ctrl.one)
	// Edit one task
	.post(ctrl.edit)
	// Edit one task
	.put(ctrl.edit)
	// Remove one task
	.delete(ctrl.rm);

router
	.post('/methods/:methodName', ctrl.execute);

module.exports = router;