export default class ApplicationsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postApplicationHandler = this.postApplicationHandler.bind(this);
    this.getApplicationsHandler = this.getApplicationsHandler.bind(this);
    this.getApplicationByIdHandler = this.getApplicationByIdHandler.bind(this);
    this.getApplicationsByUserIdHandler = this.getApplicationsByUserIdHandler.bind(this);
    this.getApplicationsByJobIdHandler = this.getApplicationsByJobIdHandler.bind(this);
    this.putApplicationByIdHandler = this.putApplicationByIdHandler.bind(this);
    this.deleteApplicationByIdHandler = this.deleteApplicationByIdHandler.bind(this);
    this.deleteApplicationByIdHandler = this.deleteApplicationByIdHandler.bind(this);
  }


  async postApplicationHandler(req, res, next) {
    try {
      const payload = req.body || {};
      this._validator.validateApplicationPayload(payload);

      const { job_id, status } = payload;
      
      const { id: user_id } = req.user;

      const applicationId = await this._service.addApplication(user_id, job_id, status);

      return res.status(201).json({
        status: 'success',
        message: 'Berhasil melamar pekerjaan',
        data: {
          id: applicationId,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getApplicationsHandler(req, res, next) {
    try {
      const applications = await this._service.getApplications();
      return res.status(200).json({ status: 'success', data: { applications } });
    } catch (error) {
      next(error);
    }
  }

  async getApplicationByIdHandler(req, res, next) {
    try {
      const applicationId = req.params.id;
      const application = await this._service.getApplicationById(applicationId);
      return res.status(200).json({ status: 'success', data: application });
    } catch (error) {
      next(error);
    }
  }

  async getApplicationsByUserIdHandler(req, res, next) {
    try {
      const { user_id } = req.params;
      const applications = await this._service.getApplicationsByUserId(user_id);
      
      return res.status(200).json({
        status: 'success',
        data: {
          applications,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getApplicationsByJobIdHandler(req, res, next) {
    try {
      const { job_id } = req.params;
      const applications = await this._service.getApplicationsByJobId(job_id);
      
      return res.status(200).json({
        status: 'success',
        data: {
          applications
        },
      });
    } catch (error) {
      next(error);
    }
  }
  
  async putApplicationByIdHandler(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body; 

      await this._service.updateApplicationStatusById(id,status);

      return res.status(200).json({
        status: 'success',
        message: 'Status lamaran berhasil diperbarui',
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteApplicationByIdHandler(req, res, next) {
    try {
      const { id } = req.params;
      await this._service.deleteApplicationById(id);
      return res.status(200).json({
        status: 'success',
        message: 'Lamaran berhasil dihapus',
      });
    } catch (error) {
      next(error);
    }
  }
}