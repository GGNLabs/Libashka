(function (data) {
    var models = require('../model').schemas.collection;

    data.create = function (req, next) {
        var table = req.table;
        var postData = new models[table](req.model);

        if (models[table]()._id && typeof models[table]()._id === 'number') {
            models[table].findOne({}, {}, {
                sort: {
                    _id: -1
                }
            }, function (err, cursor) {
                if (err) {
                    next(err, null, {
                        error: 'Unable to save data'
                    });
                } else {
                    if (cursor) {
                        postData._id = cursor._id + 1;
                    }
                    save(postData, next);
                }
            });
        } else {
            save(postData, next);
        }
    };

    data.update = function (req, next) {
        if (req) {
            var table = req.table;
            models[table].findOneAndUpdate(req.query, req.model, {
                upsert: true
            }, function (err, doc) {
                if (err) {
                    next(err, false);
                } else {
                    next(null, doc);
                }
            });
        }
    };

    data.read = function (req, next) {
        models[req.table].find(req.query, null, null, function (err, res) {
            if (err) {
                next(err, null);
            } else {
                next(null, res);
            }
        });
    };

    data.readWithLimit = function (req, next) {
        var query = models[req.table].find(req.query).sort(req.sort).limit(req.limit);
        query.exec(function (err, res) {
            if (err) {
                next(err, null);
            } else {
                next(null, res);
            }
        });
    };

    data.readOne = function (req, next) {
        models[req.table].findOne(req.query, null, null, function (err, res) {
            if (err) {
                next(err, null);
            } else {
                next(null, res);
            }
        });
    };

    data.delete = function (req, next) {
        var query = {};
        query[req.column] = req.id;
        models[req.table].remove(query, function (err) {
            if (!err) {
                next();
            } else {
                next(err, false);
            }
        });
    };

    data.validateSchema = function (req, next) {
        var errors = new models[req.table](req.schema).validateSync();
        next(errors);
    };

    data.upsert = function (req, next) {
        if (req) {
            var table = req.table;
            models[table].findOneAndUpdate(req.query, req.model, {
                upsert: true
            }, function (err, doc) {
                if (err) {
                    next(err, false);
                } else {
                    next(null, doc);
                }
            });
        }
    };

    var save = function (model, next) {
        model.save({}, function (err) {
            if (err) {
                next(err, null, {
                    error: 'Unable to save data'
                });
            } else {
                next(null, model._id);
            }
        });
    };

})(module.exports);