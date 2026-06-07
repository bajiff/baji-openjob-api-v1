export default class CompaniesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postCompanyHandler = this.postCompanyHandler.bind(this);
    this.getCompaniesHandler = this.getCompaniesHandler.bind(this);
    this.getCompanyByIdHandler = this.getCompanyByIdHandler.bind(this);
    this.putCompanyByIdHandler = this.putCompanyByIdHandler.bind(this);
    this.deleteCompanyByIdHandler = this.deleteCompanyByIdHandler.bind(this);
  }

  async postCompanyHandler(req, res, next) {
    try {
      const payload = req.body || {};
      this._validator.validateCompanyPayload(payload);

      const { name, description } = payload;
      const companyId = await this._service.addCompany({ name, description });

      return res.status(201).json({
        status: 'success',
        message: 'Company berhasil ditambahkan',
        data: {
          companyId,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getCompaniesHandler(req, res, next) {
    try {
      const companies = await this._service.getCompanies();
      return res.json({
        status: 'success',
        data: {
          companies,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getCompanyByIdHandler(req, res, next) {
    try {
      const { id } = req.params;
      const company = await this._service.getCompanyById(id);

      return res.json({
        status: 'success',
        data: {
          company,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async putCompanyByIdHandler(req, res, next) {
    try {
      const payload = req.body || {};
      this._validator.validateCompanyPayload(payload);

      const { id } = req.params;
      const { name, description } = payload;

      await this._service.editCompanyById(id, { name, description });

      return res.json({
        status: 'success',
        message: 'Company berhasil diperbarui',
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteCompanyByIdHandler(req, res, next) {
    try {
      const { id } = req.params;
      await this._service.deleteCompanyById(id);

      return res.json({
        status: 'success',
        message: 'Company berhasil dihapus',
      });
    } catch (error) {
      next(error);
    }
  }
}