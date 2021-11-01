import EmbedError from '../../structures/EmbedError';
import Event from '../../structures/Event';

export default class extends Event {
  constructor(...data) {
    super(...data, { name: 'interactionCreate' });
  }

  async run(client, interaction) {
    try {
      if (!interaction.isCommand()) return false;

      // Find command in store
      const { commandName } = interaction;
      const commandInStore = client.commands.get(commandName);
      if (!commandInStore) return false;

      // Validate command
      // TODO: Add checks for userPermissions, clientPermissions, nsfw and devOnly
      if (commandInStore.guildOnly && !interaction.inGuild()) {
        throw new EmbedError('This command can be used only in guilds');
      }

      await commandInStore.run(client, interaction);
      return true;
    } catch (err) {
      if (err instanceof EmbedError) {
        return interaction.reply({ embeds: [err.toEmbed()], ephemeral: true });
      }
      // TODO: Make beautiful log function with chalk
      console.error(err);
    }
    return true;
  }
}
