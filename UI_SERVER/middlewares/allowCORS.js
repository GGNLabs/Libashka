module.exports = function (req, res, next) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Access-Token');
    next();
};