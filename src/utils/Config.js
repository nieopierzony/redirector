import dotenv from 'dotenv';
dotenv.config();

export default class Config {
  constructor(mainApp) {
    this.mainApp = mainApp;
  }

  get common() {
    const { NODE_ENV, WEBSITE_DOMAIN } = process.env;
    return { isDebugModeEnabled: NODE_ENV === 'development', websiteURL: WEBSITE_DOMAIN };
  }

  get databases() {
    const { DB_MONGO_URL, DB_REDIS_URL } = process.env;
    return { mongoURL: DB_MONGO_URL, redisURL: DB_REDIS_URL };
  }

  get discord() {
    const { DISCORD_TOKEN, DISCORD_SECRET, DISCORD_CLIENT_ID, DISCORD_DEV_GUILD_ID } = process.env;
    return {
      token: DISCORD_TOKEN,
      secret: DISCORD_SECRET,
      clientID: DISCORD_CLIENT_ID,
      devGuildID: DISCORD_DEV_GUILD_ID,
    };
  }

  get telegram() {
    const { TELEGRAM_BOT_USERNAME, TELEGRAM_TOKEN } = process.env;
    return { botUsername: TELEGRAM_BOT_USERNAME, token: TELEGRAM_TOKEN };
  }
}
