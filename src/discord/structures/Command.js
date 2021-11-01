import { SlashCommandBuilder } from '@discordjs/builders';
import AliasPiece from './base/AliasPiece';

export default class Command extends AliasPiece {
  /**
   * Command instance
   * @param {Store} store CommandStore instance
   * @param {string} file fileName of command
   * @param {string} directory fileName
   * @param {CommandOptions} options Name of command and permissions for using
   */
  constructor(store, file, directory, options = {}) {
    super(store, file, directory, options);

    this.name = options.name;
    this.description = options.description;
    this.category = options.category || file.split('/')[0];

    if (!this.description || !this.name) throw new Error('Name and description of command are required');

    this.clientPermissions =
      options.clientPermissions && options.clientPermissions.length > 0 ? options.clientPermissions : ['SEND_MESSAGES'];
    this.userPermissions =
      options.userPermissions && options.userPermissions.length > 0 ? options.userPermissions : ['SEND_MESSAGES'];

    this.guildOnly = options.guildOnly;
    this.devOnly = options.devOnly;
    this.nsfw = options.nsfw;
    this.options = options.options;
  }

  toSlashCommand() {
    const { isEnabledDebugMode } = this.client.config.common;

    const builder = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      // If debug mode is turned on, show all commands on dev server
      .setDefaultPermission(!this.devOnly || isEnabledDebugMode);

    this?.options?.forEach(option => {
      // TODO: Add another types of options and support of choises
      if (option.type === 'string') {
        builder.addStringOption(b =>
          b.setName(option.name).setDescription(option.description).setRequired(!!option.required),
        );
      }
    });

    return builder.toJSON();
  }

  run() {
    throw new Error(`Function run() for command ${this.name} was not provided`);
  }
}

/**
 * @typedef CommandOptions
 * @property {string} name Name of command
 * @property {string} description What the command does
 * @property {string} [category] In what category store this command (shows only in help)
 * @property {string[]} [clientPermissions] Required permissions for bot to run command
 * @property {string[]} [userPermissions] Required permissions for user to use command
 * @property {boolean} [guildOnly] Whether can user call command in DM or not
 * @property {boolean} [devOnly] Special access for command
 * @property {boolean} [nsfw] Command should run only in nsfw text channels
 */
