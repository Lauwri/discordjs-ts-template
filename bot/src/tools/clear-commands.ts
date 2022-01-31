import { REST, RouteLike } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import config from "../../config";

const clientId = config.client_id;
const token = config.token;

const rest = new REST({ version: "9" }).setToken(token);

const clearGlobalCommands = async () => {
  console.log(`Clearing global commands`);
  const data: any = await rest.get(Routes.applicationCommands(clientId));
  const promises = [];
  if (data.length === 0) console.log("No global commands");
  for (const command of data) {
    console.log(`clear global command: ${command.name}`);
    const deleteUrl: RouteLike = `${Routes.applicationCommands(clientId)}/${
      command.id
    }`;
    promises.push(rest.delete(deleteUrl));
  }
  return await Promise.all(promises);
};

const clearGuildCommands = async () => {
  console.log(`Clearing guild commands`);
  const data: any = await rest.get(Routes.userGuilds());
  const promises = [];
  for (const guild of data) {
    promises.push(clearTargetGuildCommands(guild));
  }
  return await Promise.all(promises);
};

const clearTargetGuildCommands = async (guild: {
  id: string;
  name: string;
}) => {
  console.log(`Clearing commands for guild: ${guild.name}`);
  const data: any = await rest.get(
    Routes.applicationGuildCommands(clientId, guild.id)
  );
  const promises = [];
  if (data.length === 0) console.log(`Guild ${guild.name} has no commands `);
  for (const command of data) {
    console.log(`clear guild command: ${command.name}`);
    const deleteUrl: RouteLike = `${Routes.applicationGuildCommands(
      clientId,
      guild.id
    )}/${command.id}`;
    promises.push(rest.delete(deleteUrl));
  }
  return Promise.all(promises);
};

const run = async () => {
  console.log("Clear commands script started!");
  await clearGlobalCommands();
  await clearGuildCommands();
};
run();
