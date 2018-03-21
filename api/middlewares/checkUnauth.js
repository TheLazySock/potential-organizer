module.exports = function(req, res, next) {
    if (req.cookies.sid) {
        return next(res.sendStatus(403));
    }

    next();
};