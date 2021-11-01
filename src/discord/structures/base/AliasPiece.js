import Piece from './Piece';

export default class AliasPiece extends Piece {
  constructor(store, file, directory, options = {}) {
    super(store, file, directory, options);

    this.aliases = options.aliases || [];
  }
}
