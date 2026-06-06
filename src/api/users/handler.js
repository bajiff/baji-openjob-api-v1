export default class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    // Binding 'this' agar konteksnya tidak hilang saat dipanggil oleh Express router
    this.postUserHandler = this.postUserHandler.bind(this);
  }

  async postUserHandler(req, res, next) {
    try {
      this._validator.validateUserPayload(req.body);

      const { fullname, email, password } = req.body;
      const userId = await this._service.addUser({ fullname, email, password });

      return res.status(201).json({
        status: 'success',
        message: 'User berhasil ditambahkan',
        data: {
          userId,
        },
      });
    } catch (error) {
      // Lempar error ke middleware errorHandler yang kita buat sebelumnya
      next(error); 
    }
  }
}