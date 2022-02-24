require("dotenv").config();
const { Client, Intents } = require("discord.js");

const client = new Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_PRESENCES"],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.CLIENT_TOKEN);

client.on("messageCreate", (message) => {
  let author = message.author;
  // console.log("author", author);

  let member = message.mentions.members.first();
  // console.log("member", member);

  let roles = message.guild.roles.cache;
  // console.log("roles", roles);

  // roles.map((role) => {
  //   member.roles.add();
  // });

  member.roles.add(roles);

  if (message.content === "ping") {
    message.reply("Pong!");
  }
});
