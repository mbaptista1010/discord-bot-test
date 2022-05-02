require("dotenv").config();
const { Client, Intents } = require("discord.js");
const WOKCommands = require("wokcommands");
const path = require("path");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.login(process.env.CLIENT_TOKEN);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  new WOKCommands(client, {
    commandsDir: path.join(__dirname, "commands"),
  });
});
