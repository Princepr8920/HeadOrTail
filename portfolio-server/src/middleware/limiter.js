const rateLimit = require("express-rate-limit");

function rateLimiter(mins,max,message,statusCode) {
  const Limiter = rateLimit({
    windowMs: mins * 60 * 1000,  
    max: max,
    message: message,
    statusCode: statusCode,
    headers: true,
  });
  return Limiter
}

module.exports = rateLimiter;
