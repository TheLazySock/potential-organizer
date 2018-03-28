module.exports = function(req, res, next) {
    if (!req.cookies.sid) {
        return next(res.status(403).redirect('login'));
    }

    req.user_id = req.cookies.sid;
    next();
};