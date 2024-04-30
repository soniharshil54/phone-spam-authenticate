const logger = require('../utils/logger');

module.exports = {
    asyncHandler: (fn, extras) => function asyncUtilWrap(...args) {
        const fnReturn = fn(...args);
        const next = args[args.length - 1];
        return Promise.resolve(fnReturn).catch((error) => {
          logger.error(error);
          // Create Log on API request error
          next(error);
        });
      }
}