import Piece from './base/Piece';

export default class Event extends Piece {
  /**
   * Event instance
   * @param {Store} store CommandStore instance
   * @param {string} file fileName of command
   * @param {string} directory fileName
   * @param {EventOptions} options Options for this event
   */
  constructor(store, file, directory, options = {}) {
    super(store, file, directory, options);
    this.eventName = options.name;
    this.once = options.once;

    this.client[this.once ? 'once' : 'on'](this.eventName, (...data) => this.run(this.client, ...data));
  }

  run() {
    throw new Error(`Function run() for command ${this.name} was not provided`);
  }
}

/**
 * @typedef EventOptions
 * @property {boolean} [once] Once or on
 */
