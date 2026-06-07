import Joi from 'joi';

const ApplicationPayloadSchema = Joi.object({
  jobId: Joi.string().required(),
});

export { ApplicationPayloadSchema };