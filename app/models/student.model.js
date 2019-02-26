const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Student', {
  nom: Joi.string().required(),
  prenom: Joi.string().required(),
  major: Joi.string().required(),
});
