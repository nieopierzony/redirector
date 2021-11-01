import Event from '../structures/Event';

export default class extends Event {
  constructor(...data) {
    super(...data, { name: 'ready', once: true });
  }

  run(client) {
    console.log(
      `\n[Discord] [Ready] Бот запущен. Авторизован как %s  | Серверов: %d | Пользователей: %d`,
      client.user.tag,
      client.guilds.cache.size,
      client.users.cache.size,
    );

    this.logRamAndTime();
    setTimeout(() => {
      this.logRamAndTime();
    }, 20 * 60 * 1000);
  }

  logRamAndTime() {
    console.log(`[Discord] [Ready] Время: ${new Date().toLocaleTimeString()}`);
    console.log(`[Discord] [Ready] RAM: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`);
  }
}
