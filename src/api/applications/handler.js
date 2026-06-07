export default class ApplicationsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postApplicationHandler = this.postApplicationHandler.bind(this);
  }

  async postApplicationHandler(req, res, next) {
    try {
      const payload = req.body || {};
      this._validator.validateApplicationPayload(payload);

      // Ekstrak jobId dari body request
      const { jobId } = payload;
      
      // Ekstrak userId secara aman dari token JWT (middleware auth)
      const { id: userId } = req.user;

      const applicationId = await this._service.addApplication(userId, jobId);

      return res.status(201).json({
        status: 'success',
        message: 'Berhasil melamar pekerjaan',
        data: {
          applicationId,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}