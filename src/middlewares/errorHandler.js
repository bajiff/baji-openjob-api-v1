import ClientError from '../exceptions/ClientError.js';

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // 1. Tangani error dari ClientError buatan kita (InvariantError, AuthenticationError)
  if (err instanceof ClientError) {
    return res.status(err.statusCode).json({
      status: 'failed',
      message: err.message,
    });
  }

  // 2. Tangani error cacat format JSON dari express.json()
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      status: 'failed',
      message: 'Format JSON tidak valid. Pastikan tidak ada sintaks yang salah atau koma berlebih.',
    });
  }

  // 3. Error dari server (500) yang benar-benar tidak terduga
  console.error(err);
  return res.status(500).json({
    status: 'error',
    message: 'Maaf, terjadi kegagalan pada server kami.',
  });
};

export default errorHandler;