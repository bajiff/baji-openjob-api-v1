import pool from './pool.js';
import { nanoid } from 'nanoid';
import InvariantError from '../../exceptions/InvariantError.js';

export default class ApplicationsService {
  constructor() {
    this._pool = pool;
  }
  
  async addApplication(user_id, job_id, status) {
    const id = `application-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO applications VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, user_id, job_id, status],
    };

    try {
      const result = await pool.query(query);
      return result.rows[0].id;
    } catch (error) {
      if (error.code === '23503') {
        throw new InvariantError('Gagal melamar. Job ID tidak valid atau tidak ditemukan.');
      }
      throw error;
    }
  }

  async getApplications(){
    const query = {
      text: 'SELECT * FROM applications',
    };
    const result = await pool.query(query);
    return result.rows;
  }

  async getApplicationById(applicationId) {
    const query = {
      text: 'SELECT * FROM applications WHERE id = $1',
      values: [applicationId],
    };
    const result = await pool.query(query);
    return result.rows[0];
  }
  async getApplicationsByUserId(user_id) {
    const query = {
      text: 'SELECT * FROM applications WHERE user_id = $1',
      values: [user_id],
    };
    const result = await pool.query(query);
    return result.rows;
  }

  async getApplicationsByJobId(jobId) { 
    const query = {
      text: 'SELECT * FROM applications WHERE job_id = $1', 
      
      values: [jobId], 
    };
    const result = await this._pool.query(query);
    return result.rows; 
  }

  async updateApplicationStatusById(id, status) {
    const query = {
      text: 'UPDATE applications SET status = $1 WHERE id = $2 RETURNING id',
      
      values: [status, id], 
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal memperbarui status. Id tidak ditemukan');
    }
  }

  async deleteApplicationById(id) {
    const query = {
      text: 'DELETE FROM applications WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal menghapus lamaran. Id tidak ditemukan'); 
    }
  }

}