import express from 'express';
import authMiddleware from '../../middlewares/auth.js';

const routes = (handler) => {
  const router = express.Router();
  
  router.get('/', handler.getJobsHandler);
  router.get('/:id', handler.getJobByIdHandler);
  router.get('/company/:companyId', handler.getJobsByCompanyIdHandler);
  router.get('/category/:categoryId', handler.getJobsByCategoryIdHandler);
  router.get('/bookmarks', authMiddleware, handler.getBookmarkedJobsHandler);
  router.get('/bookmarks', authMiddleware, handler.getBookmarksHandler);
  router.delete('/bookmarks/:id', authMiddleware, handler.deleteBookmarkHandler);

  router.post('/:id/bookmark', authMiddleware, handler.postBookmarkHandler);
  router.post('/', authMiddleware, handler.postJobHandler);
  router.put('/:id', authMiddleware, handler.putJobByIdHandler);
  router.delete('/:id', authMiddleware, handler.deleteJobByIdHandler);
  
  return router;
};

export default routes;