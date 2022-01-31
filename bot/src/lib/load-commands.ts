import fs from "fs";
import { Collection } from "discord.js";
import DClient from "../../types/DiscordClient";

export default (client: DClient, commandsPath = "../commands") => {
  // Load commands from commands folder
  console.log("Loading commands");
  client.commands = new Collection();
  const commandFiles = fs.readdirSync("./src/commands");

  for (const file of commandFiles) {
    const command = require(`${commandsPath}/${file}`);
    console.log(`Loaded command: ${command.data.name}`);

    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
  }
};
