import { JobPayloadSchema } from './schema.js';
import InvariantError from '../../exceptions/InvariantError.js';

const JobsValidator = {
  validateJobPayload: (payload) => {
    const validationResult = JobPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

export default JobsValidator;