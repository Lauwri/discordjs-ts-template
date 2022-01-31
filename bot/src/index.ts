// Require the necessary discord.js classes
import config from "../config";
import { Intents } from "discord.js";
import DClient from "../types/DiscordClient";
import loadCommands from "./lib/load-commands";

// Create a new client instance
const client = new DClient({ intents: [Intents.FLAGS.GUILDS] });

loadCommands(client);

// Execute matching command on interaction
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Client ready!");
});

// Login to Discord with your client's token
client.login(config.token);
