import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import fs from "fs";

import config from "../../config";

const clientId = config.client_id;
const token = config.token;

if (!clientId || !token) throw new Error("Required configuration missing");

console.log(`Deploying global commands to app`);

const commands = [];
const commandFiles = fs.readdirSync("./src/commands");

for (const file of commandFiles) {
  const command = require(`../commands/${file}`);
  console.log(`Deploying command: ${command.data.name}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(token);

rest
  .put(Routes.applicationCommands(clientId), {
    body: commands,
  })
  .then(() => console.log("Successfully deployed application commands."))
  .catch(console.error);
