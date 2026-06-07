import express from 'express';
import authMiddleware from '../../middlewares/auth.js';

const routes = (handler) => {
  const router = express.Router();
  
  // Rute PUBLIC (Tanpa authMiddleware)
  router.get('/', handler.getCompaniesHandler); // List all companies [cite: 35]
  router.get('/:id', handler.getCompanyByIdHandler); // Get company detail [cite: 35, 36]

  // Rute PROTECTED (Wajib authMiddleware)
  router.post('/', authMiddleware, handler.postCompanyHandler); // Create company [cite: 38]
  router.put('/:id', authMiddleware, handler.putCompanyByIdHandler); // Update company [cite: 38, 39]
  router.delete('/:id', authMiddleware, handler.deleteCompanyByIdHandler); // Delete company [cite: 39]
  
  return router;
};

export default routes;