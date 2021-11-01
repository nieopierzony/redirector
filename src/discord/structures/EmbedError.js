import { MessageEmbed } from 'discord.js';
import { Colors } from '../utils/Constants';

export default class EmbedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'EmbedError';
  }

  toEmbed() {
    return new MessageEmbed()
      .setColor(Colors.ErrorRed)
      .setTitle('**⚠️ ┃ An error occurred while processing the command**')
      .setDescription(`**${this.message}**`);
  }
}
