module.exports = function(options){
  return function(req, res, next){
      if (process.env.APIKEY && req.header(options.header)  !== process.env.APIKEY){
          return next({status: 401});
      }

      next();
  }
};