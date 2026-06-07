import express from 'express';
import authMiddleware from '../../middlewares/auth.js';

const routes = (handler) => {
  const router = express.Router();
  
  // Endpoint untuk melamar kerja
  router.post('/', authMiddleware, handler.postApplicationHandler);
  
  return router;
};

export default routes;