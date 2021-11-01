import { Intents } from 'discord.js';

import Redis from './database/Redis';
import connectMongo from './database/connectMongo';
import DiscordClient from './discord/Client';
import TelegramClient from './telegram/Client';
import Config from './utils/Config';

module.exports = class Main {
  constructor() {
    this.config = new Config(this);

    this.redis = new Redis(this);
    connectMongo(this);

    this.telegram = new TelegramClient(this);
    this.discord = new DiscordClient(this, { intents: [Intents.FLAGS.GUILDS] });
  }
};
