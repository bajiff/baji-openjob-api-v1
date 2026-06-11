import 'dotenv/config';
import pool from './src/services/postgres/pool.js';

const truncateDatabase = async () => {
  try {
    console.log('⏳ Sedang menyapu bersih database...');
    
    await pool.query('TRUNCATE TABLE users, companies, categories, jobs, applications CASCADE;');
    
    console.log('✅ Database berhasil dibersihkan! Siap untuk testing Postman.');
  } catch (error) {
    console.error('❌ Gagal membersihkan database:', error.message);
  } finally {
    await pool.end();
  }
};

truncateDatabase();