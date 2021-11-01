import Command from '../../structures/Command';
import EmbedError from '../../structures/EmbedError';

export default class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'help',
      description: 'List of commands and useful resources',
    });
  }

  run() {
    throw new EmbedError('The command is not ready yet');
  }
}
