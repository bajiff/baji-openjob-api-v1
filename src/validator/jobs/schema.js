import Joi from 'joi';

const JobPayloadSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  companyId: Joi.string().required(),
  categoryId: Joi.string().required(),
});

export { JobPayloadSchema };