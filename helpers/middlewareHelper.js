const middlewareHelper = {
  runMiddleware: function (req, res, fn) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        } else {
          return resolve(result);
        }
      });
    });
  },
};
module.exports = middlewareHelper;
