module.exports.setHeaders = async (req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.setHeader('Content-Type', 'application/json');
    return next()
}

module.exports.validateUser = async (req, res, next) => {
    //TODO

};