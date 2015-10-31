/**
 * Get all tasks
 **/
exports.all = function(req, res) {
	var isQuery = req.query.query;

	if (!isQuery && Object.keys(req.query).length > 0) {
		ds.Task.meta.attributes.forEach(function(attr) {
			if (req.query.hasOwnProperty(attr.name)) {
				isQuery = isQuery || {};
				isQuery[attr.name] = req.query[attr.name];
			}
		});
	}

	ds.Task.query(isQuery || {}).then(function(col) {
		res.json(col.models);
	});
};

/**
 * Create one task
 **/
exports.create = function(req, res) {
	req.assert('name', 'You must enter a name').notEmpty();
	ds.Task.createEntity(req.body).save().then(function(task) {
		res.json(task);
	});
};

/**
 * Remove all tasks
 **/
exports.rmAll = function(req, res) {
	ds.Task.remove().then(function(r) {
		res.json(r);
	});
};

/**
 * Read one task
 **/
exports.one = function(req, res) {
	ds.Task.find({
		ID: req.params.id
	}).then(function(one) {
		if (one) {
			return res.json(one);
		}

		res.status(404).end();
	}).catch(function() {
		res.status(404).end();
	});
};

/**
 * Edit one task
 **/
exports.edit = function(req, res) {
	var t = ds.Task.createEntity({
		__KEY: req.params.id
	});
	t.set(req.body);
	t.save().then(function(t) {
		res.json(t);
	});
};

/**
 * Remove one task
 **/
exports.rm = function(req, res) {
	var t = ds.Task.createEntity({
		__KEY: req.params.id
	});
	t.remove().then(function(t) {
		res.json(t);
	});
};

/**
 * Execute a dataclass method
 **/
exports.execute = function(req, res) {
	if (typeof ds.Task[req.params.methodName] === 'function') {
		return ds.Task[req.params.methodName]
			.apply(ds.Task, Array.isArray(req.body) ? req.body : [])
			.then(function(d) {
				res.json(d);
			}).catch(function() {
				res.status(400).end();
			});
	}

	res.status(404).end();
};