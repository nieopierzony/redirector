import Command from '../../structures/Command';
import EmbedError from '../../structures/EmbedError';
import Database from '../../utils/Database';

export default class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'link',
      description: 'Connects Telegram chat to the current channel',
      options: [{ name: 'code', type: 'string', description: 'Code from Telegram bot', required: true }],
    });
  }
  async run(client, interaction) {
    // Check user telegram
    const user = await Database.getUser(interaction.user.id);
    if (!user.telegramID) {
      const phraseOptions = { userTag: interaction.user.tag, userID: interaction.user.id };
      throw new EmbedError(client.phrases.t('errors.needToLinkTelegram', phraseOptions));
    }

    // TODO
    // Find code in redis
    // Check if owner of code is the user
    // Check if bot has permissions to read chat in current moment
    // Create subscription
    // Remove code from redis
    // Edit message in telegram
    // Send success message
  }
}
