export default class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postUserHandler = this.postUserHandler.bind(this);
  }

  async postUserHandler(req, res, next) {
    try {
      const payload = req.body || {};

      this._validator.validateUserPayload(payload);

      const { name, email, password } = payload;
      
      const userId = await this._service.addUser({ name, email, password });

      return res.status(201).json({
        status: 'success',
        message: 'User berhasil ditambahkan',
        data: {
          userId,
        },
      });
    } catch (error) {
      next(error); 
    }
  }
}