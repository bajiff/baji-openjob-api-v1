import express from 'express';
import authMiddleware from '../../middlewares/auth.js';

const routes = (handler) => {
  const router = express.Router();
  
  router.get('/', authMiddleware, handler.getBookmarksHandler);
  
  router.get('/:id', authMiddleware, handler.getBookmarkByIdHandler);
  
  router.delete('/:id', authMiddleware, handler.deleteBookmarkHandler);
  
  return router;
};

export default routes;