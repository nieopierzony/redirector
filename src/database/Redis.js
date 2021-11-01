import { createClient } from 'redis';

export default class Redis {
  constructor(mainApp) {
    this.mainApp = mainApp;
    this.config = this.mainApp.config;
    this.connect();
  }

  connect() {
    this.client = createClient(this.config.databases.redisURL);
    this.client.on('ready', () => console.log('\n[Redis @ Connect] Successfuly connected'));
    this.client.on('error', err => console.error('[Redis @ Connect]', err));
    return this;
  }
}
