import ProfileHandler from './handler.js';
import routes from './routes.js';

const createProfileApi = (usersService) => {
  const profileHandler = new ProfileHandler(usersService);
  return routes(profileHandler);
};

export default createProfileApi;