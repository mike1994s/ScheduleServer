module.exports = function(req, res, next) {
    res.sendHttpError = function(error) {
        res.status(error.status);
        res.charset = 'utf-8'
//        res.writeHead(error.status)
        //log.error(error);

        if (res.req.headers['x-requested-with'] == 'XMLHttpRequest') {
            res.json(error);
        } else {
            res.render("error", {error: error}
//            , function(err, stuff) {
//                if (!err) {
////                    console.log(stuff);
//                    res.write(stuff);
//                    res.end();
//                }
//            }
            );
        }
    }
    next();
};