import pool from './pool.js';
import { nanoid } from 'nanoid';
import InvariantError from '../../exceptions/InvariantError.js';

export default class ApplicationsService {
  async addApplication(user_id, job_id) {
    const id = `application-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO applications VALUES($1, $2, $3) RETURNING id',
      values: [id, user_id, job_id],
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
}