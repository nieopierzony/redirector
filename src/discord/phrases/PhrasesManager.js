import fs from 'fs';
import path from 'path';
import Collection from '@discordjs/collection';
import ejs from 'ejs';

export default class PhrasesStore extends Collection {
  constructor(client) {
    super();
    this.client = client;
    this.init();
  }

  get commonParams() {
    const { botUsername } = this.client.config.telegram;
    return { ...this.client.config.common, botUsername };
  }

  init() {
    const filesInFolder = fs.readdirSync(__dirname);
    const filesWithPhrases = filesInFolder.filter(i => i.endsWith('.json'));
    filesWithPhrases.forEach(fileName => {
      const fileContent = fs.readFileSync(path.join(__dirname, fileName), 'utf-8');
      const phrases = JSON.parse(fileContent);

      const category = fileName.split('.json')[0];
      Object.entries(phrases).forEach(([key, value]) => this.set(`${category}.${key}`, value));
    });
    return this;
  }

  t(key, values = {}) {
    if (!key) throw new TypeError('Key should be provided');
    return ejs.render(this.get(key) ?? key, { ...values, ...this.commonParams });
  }
}
