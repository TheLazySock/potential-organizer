module.exports = function(req, res, next) {
    if (!req.cookies.sid) {
        return next(res.sendStatus(403));
    }

    req.user_id = req.cookies.sid;
    next();
};