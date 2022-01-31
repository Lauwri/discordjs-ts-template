import Discord, { CommandInteraction, Message } from "discord.js";

export interface Command {
  name: string;
  description: string;
  execute: (message: CommandInteraction, args?: string[]) => any;
}

class DClient extends Discord.Client {
  public commands: Discord.Collection<string, Command>;

  constructor(opts: Discord.ClientOptions) {
    super(opts);
    this.commands = new Discord.Collection();
  }
}

export default DClient;
