import discordHandler from './discord';

export default bot => {
  bot.action(/^discord(?:::(\w+#\d{4}))(?:::(\d{18}))$/, discordHandler);
};
