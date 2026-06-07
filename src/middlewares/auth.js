import jwt from 'jsonwebtoken';
import process from 'process';
import AuthenticationError from '../exceptions/AuthenticationError.js';

const authMiddleware = (req, res, next) => {
  // 1. Ambil header authorization
  const authHeader = req.headers.authorization;

  // 2. Cek apakah header ada dan memiliki format 'Bearer <token>'
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AuthenticationError('Akses ditolak. Token tidak ditemukan atau format salah.'));
  }

  // 3. Ekstrak token (mengambil elemen kedua setelah spasi)
  const token = authHeader.split(' ')[1];

  try {
    // 4. Verifikasi token menggunakan rahasia ACCESS_TOKEN_KEY
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    
    // 5. Sisipkan data user ke dalam objek request
    req.user = { id: decoded.id };
    
    // 6. Lanjut ke handler/rute tujuan
    next();
  } catch (error) {
    return next(new AuthenticationError('Token tidak valid atau sudah kedaluwarsa.', error));
  }
};

export default authMiddleware;