module.exports = function(req, res, next) {
    if (!req.session.user) {
        return res.send(401);
    }
   
    next();
};