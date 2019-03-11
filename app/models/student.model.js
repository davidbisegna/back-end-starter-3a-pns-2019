const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Student', {
  lastName: Joi.string().required(),
  firstName: Joi.string().required(),
  email: Joi.string().required(),
  profilePicture: Joi.string().required(),
  notes: Joi.string().required(),
});
