import Joi from 'joi';

const UserPayloadSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export { UserPayloadSchema };