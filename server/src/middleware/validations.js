const { check } = require('express-validator');

exports.verifyData = [
  check('phoneNumber')
    .isMobilePhone()
    .withMessage('Please enter a valid phone number')
];