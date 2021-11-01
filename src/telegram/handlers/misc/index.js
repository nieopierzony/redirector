import startHandler from './start';

export default bot => {
  bot.start(startHandler);
  bot.action('start', startHandler);
};
