const { body, validationResult } = require("express-validator");

const validationRules = [
  body("subject").trim(),
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long")
    .trim(),
  body("email").isEmail().withMessage("invalid email address").normalizeEmail(),
  body("message")
    .isLength({ min: 3 })
    .withMessage("Message must be at least 10 characters long"),
];

const validator = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errObj = {status:400}
    errors.array().map(e=>errObj[e.param] = {msg:e.msg,name:e.param})
    return res.status(400).json({ success:false, errObj });
  } else {
    return next();
  }
};

module.exports = { validator, validationRules };
