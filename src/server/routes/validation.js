const {celebrate, Joi, errors} = require('celebrate');

module.exports = {
  replayCollection: celebrate({
    query: Joi.object({
      page: Joi.number()
        .optional()
        .default(1)
        .min(1),
      pageSize: Joi.number()
        .optional()
        .default(20)
        .min(5)
    })
  }),
  userLogin: celebrate({
    body: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required()
    })
  })
};
