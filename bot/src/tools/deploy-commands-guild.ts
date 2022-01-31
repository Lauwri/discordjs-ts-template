import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import fs from "fs";

import config from "../../config";

// !!!!!!!!!! WIP

const clientId = config.client_id;
const guildId = process.argv[2];
const token = config.token;

if (!clientId || !guildId || !token)
  throw new Error("Required configuration missing");

console.log(`Deploying commands to guild ${guildId}`);

const commands = [];
const commandFiles = fs.readdirSync("./src/commands");

for (const file of commandFiles) {
  const command = require(`../commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(token);

rest
  .put(Routes.applicationCommands(clientId), {
    body: commands,
  })
  .then(() => console.log("Successfully deployed guild commands."))
  .catch(console.error);
