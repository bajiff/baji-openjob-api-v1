export default class ProfileHandler {
  constructor(usersService) {
    this._usersService = usersService;
    this.getProfileHandler = this.getProfileHandler.bind(this);
  }

  async getProfileHandler(req, res, next) {
    try {
      const userId = req.user.id; 
      
      const user = await this._usersService.getUserById(userId);

      return res.json({
        status: 'success',
        data: {
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}