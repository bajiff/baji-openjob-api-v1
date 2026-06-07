import pool from './pool.js';
import { nanoid } from 'nanoid';
import InvariantError from '../../exceptions/InvariantError.js';
import NotFoundError from '../../exceptions/NotFoundError.js';

export default class JobsService {
  async addJob({ title, description, companyId, categoryId }) {
    const id = `job-${nanoid(16)}`;
    const query = {
      // Sesuai dengan kolom DB: id, title, description, company_id, category_id
      text: 'INSERT INTO jobs VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, title, description, companyId, categoryId],
    };

    try {
      const result = await pool.query(query);
      return result.rows[0].id;
    } catch (error) {
      // Menangkap error Foreign Key Violation dari PostgreSQL (kode 23503)
      if (error.code === '23503') {
        throw new InvariantError('Gagal menambahkan lowongan. Company ID atau Category ID tidak valid.');
      }
      throw error;
    }
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