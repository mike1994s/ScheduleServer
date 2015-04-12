var HttpError = require('error').HttpError;
//http://passportjs.org/ - для регистраций через gmail и  прочее
module.exports = function(req, res, next) {
    if (!req.session.user) {
        return next(new HttpError(401, "Вы не авторизованы"));
    }
    next();
};