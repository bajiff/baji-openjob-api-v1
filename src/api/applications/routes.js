import express from 'express';
import authMiddleware from '../../middlewares/auth.js';

const routes = (handler) => {
  const router = express.Router();
  
  router.get('/', authMiddleware, handler.getApplicationsHandler);
  router.get('/user/:user_id', authMiddleware, handler.getApplicationsByUserIdHandler);
  router.get('/job/:job_id', authMiddleware, handler.getApplicationsByJobIdHandler);
  router.get('/:id', authMiddleware, handler.getApplicationByIdHandler);

  router.put('/:id', authMiddleware, handler.putApplicationByIdHandler);
  router.post('/', authMiddleware, handler.postApplicationHandler);
  router.delete('/:id', authMiddleware, handler.deleteApplicationByIdHandler);
  
  return router;
};

export default routes;