export default class JobsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postJobHandler = this.postJobHandler.bind(this);
    this.getJobsHandler = this.getJobsHandler.bind(this);
    this.getJobByIdHandler = this.getJobByIdHandler.bind(this);
    this.putJobByIdHandler = this.putJobByIdHandler.bind(this);
    this.deleteJobByIdHandler = this.deleteJobByIdHandler.bind(this);
  }

  async postJobHandler(req, res, next) {
    try {
      const payload = req.body || {};
      this._validator.validateJobPayload(payload);

      const { title, description, companyId, categoryId } = payload;
      const jobId = await this._service.addJob({ title, description, companyId, categoryId });

      return res.status(201).json({
        status: 'success',
        message: 'Lowongan pekerjaan berhasil ditambahkan',
        data: {
          jobId,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getJobsHandler(req, res, next) {
    try {
      const jobs = await this._service.getJobs();
      return res.json({
        status: 'success',
        data: {
          jobs,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getJobByIdHandler(req, res, next) {
    try {
      const { id } = req.params;
      const job = await this._service.getJobById(id);

      return res.json({
        status: 'success',
        data: {
          job,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async putJobByIdHandler(req, res, next) {
    try {
      const payload = req.body || {};
      this._validator.validateJobPayload(payload);

      const { id } = req.params;
      const { title, description, companyId, categoryId } = payload;

      await this._service.editJobById(id, { title, description, companyId, categoryId });

      return res.json({
        status: 'success',
        message: 'Lowongan pekerjaan berhasil diperbarui',
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteJobByIdHandler(req, res, next) {
    try {
      const { id } = req.params;
      await this._service.deleteJobById(id);

      return res.json({
        status: 'success',
        message: 'Lowongan pekerjaan berhasil dihapus',
      });
    } catch (error) {
      next(error);
    }
  }
}