import pool from './pool.js';
import { nanoid } from 'nanoid';
import InvariantError from '../../exceptions/InvariantError.js';
import NotFoundError from '../../exceptions/NotFoundError.js';

export default class JobsService {
  constructor() {
    this._pool = pool;
  }
  async addJob({ 
    company_id, category_id, title, description, 
    job_type, experience_level, location_type, 
    location_city, salary_min, salary_max, 
    is_salary_visible, status 
  }) {
    const id = `job-${nanoid(16)}`;

    // 2. Pastikan kueri SQL menyebutkan ke-12 kolom beserta $1 sampai $13
    const query = {
      text: `INSERT INTO jobs (
               id, company_id, category_id, title, description, 
               job_type, experience_level, location_type, 
               location_city, salary_min, salary_max, 
               is_salary_visible, status
             ) VALUES (
               $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
             ) RETURNING id`,
      values: [
        id, company_id, category_id, title, description, 
        job_type, experience_level, location_type, 
        location_city, salary_min, salary_max, 
        is_salary_visible, status
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Job gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getJobs() {
    // Mapping nama kolom snake_case menjadi camelCase menggunakan alias (AS)
    const result = await pool.query(
      'SELECT id, title, description, company_id AS "companyId", category_id AS "categoryId" FROM jobs'
    );
    return result.rows;
  }

  async getJobById(id) {
    const query = {
      text: 'SELECT id, title, description, company_id AS "companyId", category_id AS "categoryId" FROM jobs WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Lowongan pekerjaan tidak ditemukan');
    }

    return result.rows[0];
  }

  async editJobById(id, { title, description, companyId, categoryId }) {
    const query = {
      text: 'UPDATE jobs SET title = $1, description = $2, company_id = $3, category_id = $4 WHERE id = $5 RETURNING id',
      values: [title, description, companyId, categoryId, id],
    };

    try {
      const result = await pool.query(query);
      if (!result.rows.length) {
        throw new NotFoundError('Gagal memperbarui lowongan. Id tidak ditemukan');
      }
    } catch (error) {
      if (error.code === '23503') {
        throw new InvariantError('Gagal memperbarui lowongan. Company ID atau Category ID tidak valid.');
      }
      throw error;
    }
  }

  async deleteJobById(id) {
    const query = {
      text: 'DELETE FROM jobs WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Lowongan gagal dihapus. Id tidak ditemukan');
    }
  }
}