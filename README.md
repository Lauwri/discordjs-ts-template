# Discordjs TypeScript Template

Easy use TypeScript template for [discord.js](https://github.com/discordjs/discord.js)

## Prequisites

- Nodejs
- Access to discord developer portal

## Installation

```
cd bot
npm install
```

Create a .env file in ./bot folder and fill it from sample. Client id is applications ID from discord portal and token is bots token from same.

## Running and developing bot

Run bot in hotreload mode:

```
npm run dev
```

Builds & runs built bot

```
npm start
```

## Deploying commands

To use Slash Commands, they first need to be registered in discord API.
Add command descriptions and implementation in ./src/commands then deploy them by running

```
npm run deploy-commands:global
```

Or per guild commands (WIP)

```
npm run deploy-commands:guild targetGuildId
```

## Clearing commands

Clear all commands by running

```
npm run clear-commands:all
```
