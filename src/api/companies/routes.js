import express from 'express';
import authMiddleware from '../../middlewares/auth.js';

const routes = (handler) => {
  const router = express.Router();
  
  router.get('/', handler.getCompaniesHandler);
  router.get('/:id', handler.getCompanyByIdHandler);


  router.post('/', authMiddleware, handler.postCompanyHandler); 
  router.put('/:id', authMiddleware, handler.putCompanyByIdHandler); 
  router.delete('/:id', authMiddleware, handler.deleteCompanyByIdHandler); 
  
  return router;
};

export default routes;