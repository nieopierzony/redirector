import User from 'database/models/User';

export default class Database extends null {
  static async getUser(discordID) {
    let user = await User.findOne({ discordID });
    if (!user) user = await User.create({ discordID });
    return user;
  }
}
