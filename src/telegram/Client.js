import path from 'path';
import { Telegraf } from 'telegraf';
import TelegrafI18n from 'telegraf-i18n';

import handlersController from './handlers/index';

const i18n = new TelegrafI18n({
  defaultLanguage: 'en-US',
  directory: path.resolve(__dirname, 'locales'),
});

export default class extends Telegraf {
  constructor(mainApp, ...args) {
    super(mainApp.config.telegram.token, ...args);
    this.mainApp = mainApp;

    this.context.client = this;
    this.init();
  }

  async init() {
    this.use(i18n.middleware());
    handlersController(this);
    await this.launch();
    console.log(`\n[Telegram] Bot has been started`);
    return this;
  }
}
