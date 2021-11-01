export default class Piece {
  constructor(store, file, directory, options) {
    this.client = store.client;
    this.mainApp = this.client.mainApp;

    this.name = typeof file === 'string' ? file.split('.')[0] : file;
    this.enabled = options ? options.enabled : true;
    this.store = store;
    this.directory = directory;
  }
}
