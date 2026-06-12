import express from 'express';
import authMiddleware from '../../middlewares/auth.js';

const routes = (handler) => {
  const router = express.Router();
  
  router.get('/', authMiddleware, handler.getApplicationsHandler);

  router.get('/:id', authMiddleware, handler.getApplicationByIdHandler);
  router.post('/', authMiddleware, handler.postApplicationHandler);
  
  return router;
};

export default routes;