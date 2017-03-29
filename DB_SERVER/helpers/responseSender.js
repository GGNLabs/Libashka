(function (responseSender) {
    responseSender.send = function (err, data, res) {
        if (err) {
            return responseSender.sendError(err, res);
        }
        responseSender.sendSucess(data, res);
    }
    responseSender.sendSucess = function (data, res, code, message) {
        code = code || 200;
        message ? data.message = message : '';
        res.status(code).json(data);
    };

    responseSender.sendError = function (err, res, errorCode, message) {
        errorCode = errorCode || 500;
        message ? err.message = message : '';
        res.status(errorCode).json(err);
    };
})(module.exports);