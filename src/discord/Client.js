import { join } from 'path';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { Client, Collection } from 'discord.js';

import PhrasesStore from './phrases/PhrasesManager';
import Command from './structures/Command';
import Event from './structures/Event';

import AliasStore from './structures/base/AliasStore';
import Store from './structures/base/Store';

export default class AdvancedClient extends Client {
  constructor(mainApp, options) {
    super(options);
    this.mainApp = mainApp;
    this.config = this.mainApp.config;

    this.stores = new Collection();
    this.phrases = new PhrasesStore(this);
    this.commands = new AliasStore(this, 'commands', Command);
    this.events = new Store(this, 'events', Event);

    this.registerStore(this.commands).registerStore(this.events);

    const pieceDirectory = join(__dirname);
    for (const store of this.stores.values()) store.registerPieceDirectory(pieceDirectory);

    console.log(`[DiscordClient] Starting`);
    this.login(this.config.discord.token);
    this.registerSlashCommands();
  }

  registerStore(store) {
    this.stores.set(store.name, store);
    return this;
  }

  async login(token) {
    const loaded = await Promise.all(
      this.stores.map(async store => `[Loader] Successfuly loaded ${await store.loadAll()} ${store.name}.`),
    ).catch(err => {
      console.error(err);
      process.exit();
    });
    console.log(loaded.join('\n'));
    super.login(token);
    return this;
  }

  async registerSlashCommands() {
    try {
      const { isDebugModeEnabled } = this.config.common;
      const { clientID, token, devGuildID } = this.config.discord;

      const commands = this.commands.map(i => i.toSlashCommand());
      const rest = new REST({ version: '9' }).setToken(token);
      const endpoint = isDebugModeEnabled ? Routes.applicationGuildCommands : Routes.applicationCommands;

      await rest.put(endpoint(clientID, devGuildID), { body: commands });
      console.log(`\n[Discord] [SlashCommands] Application commands were successfully registred`);
    } catch (err) {
      console.error(`[Error @ [Discord][SlashCommands]]`, err);
    }
  }
}
