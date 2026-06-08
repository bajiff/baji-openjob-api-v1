import express from 'express';

const routes = (handler) => {
  const router = express.Router();
  
  // Endpoint Public: POST /users -> Register new user
  router.post('/', handler.postUserHandler);
  router.get('/:id', handler.getUserByIdHandler);
  
  return router;
};

export default routes;