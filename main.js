const {
  Client,
  GatewayIntentBits,
  Collection,
  EmbedBuilder,
} = require("discord.js");
const {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  VoiceConnectionStatus,
} = require("@discordjs/voice");
const ytdl = require("ytdl-core");
const idk = require("ffmpeg-static");
const fs = require("fs");

const flawlessvictory = require("./commands/flawlessvictory");
const ping = require("./commands/clear");
const timer = require("./commands/timer");
const welcome = require("./welcome");
const player = require("./commands/play");
const keepAlive = require("./server.js");

const prefix = "!";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.commands = new Collection();

const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log("Hood is back to the grid!");
  client.user.setActivity("Im Back In Business!");
  welcome(client);
});

// This variable stores the current voice connection for the bot
let connection;

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (
    message.content.includes("@here") ||
    message.content.includes("@everyone")
  )
    return;

  if (message.mentions.has(client.user)) {
    message.channel.send("Yo Wassupp!");
    return;
  }

  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  const today = new Date().toLocaleDateString("en-GB");
  const now = new Date();
  const locald = now.toLocaleTimeString("en-GB", { hour12: false });

  const isNotMusicChannel = message.channel.id !== "896404693125840906";

  const notRightChannel = () => {
    if (isNotMusicChannel) {
      message.channel.send("Music Commands Not Allowed Here!").then(() => {
        setTimeout(() => {
          message.channel.bulkDelete(2, true).catch(console.error);
        }, 3500);
      });
      return true;
    }
    return false;
  };

  const cmd = command;

  if (cmd === "clear") {
    client.commands.get("clear").execute(message, args);
  } else if (cmd === "timer") {
    client.commands.get("timer").execute(message, args);
  } else if (cmd === "flawlessvictory") {
    client.commands.get("flawlessvictory").execute(message, args);
  } else if (cmd === "help") {
    const cmds = [
      client.commands.get("play"),
      client.commands.get("flawlessvictory"),
      client.commands.get("timer"),
      client.commands.get("clear"),
    ];

    let helps = "";

    for (let i = 0; i < cmds.length; i++) {
      helps += `!${cmds[i].getName()} - ${cmds[i].getDescription()}\n`;
    }

    const embed = new EmbedBuilder()
      .setTitle("My Commands:")
      .setColor(0xff0000)
      .setDescription(helps);

    message.channel.send({ embeds: [embed] });
    message.react("👍");
  } else if (["play", "p"].includes(cmd)) {
    if (notRightChannel()) return;
    if (!args[0]) {
      message.channel.send("Gimme something to work with!");
    } else if (args[0].startsWith("https")) {
      player.execute(message, args, 1);
    } else {
      player.execute(message, args, 7);
    }
    console.log(`bot played: ${args[0]} @ ${locald}`);
  } else if (cmd === "dc") {
    if (notRightChannel()) return;

    if (connection) {
      connection.destroy(); // Disconnect the bot from the voice channel
      console.log(`bot disconnected @ ${locald}`);
    }
  } else if (cmd === "time") {
    message.channel.send(locald);
  } else if (cmd === "date") {
    message.channel.send(today);
  } else if (cmd === "roast") {
    player.execute(message, args, 3);
    console.log(`bot played: ${args[0]} @ ${locald}`);
    message.react("🔥");
  } else if (cmd === "fiddleimpression") {
    player.execute(message, args, 4);
    console.log(`bot played: ${args[0]} @ ${locald}`);
  } else if (cmd === "ohhh") {
    player.execute(message, args, 5);
    console.log(`bot played: ${args[0]} @ ${locald}`);
  } else if (cmd === "sexybanana") {
    player.execute(message, args, 6);
    console.log(`bot played: ${args[0]} @ ${locald}`);
  } else if (cmd === "edgeofnight") {
    message.channel.send(
      "https://cdn.discordapp.com/attachments/488293697935376406/930526115116744784/edge-of-night-46x.webp",
    );
  } else if (cmd === "whatthedogdoin") {
    player.execute(message, args, 8);
    console.log(`bot played: ${args[0]} @ ${locald}`);
  } else if (cmd === "seek") {
    player.execute(message, args, 0);
  } else if (cmd === "skip") {
    player.execute(message, args, 9);
  } else if (cmd === "icandoit2") {
    player.execute(message, args, 10);
    console.log(`bot played: ${args[0]} @ ${locald}`);
  } else if (cmd === "lame") {
    player.execute(message, args, 11);
    console.log(`bot played: ${args[0]} @ ${locald}`);
  } else if (cmd === "mangofork") {
    player.execute(message, args, 12);
    console.log(`bot played: ${args[0]} @ ${locald}`);
  } else if (cmd === "join") {
    //if (notRightChannel()) return;

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.reply("You need to be in a voice channel first!");
    }

    try {
      connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        selfDeaf: false,
      });

      message.channel.send("Let Me Hop In This Bitch!");
      console.log(`bot joined VC @ ${locald}`);
    } catch (error) {
      console.error("Error joining voice channel:", error);
      message.channel.send("Couldn't join the voice channel.");
    }
  }
});

keepAlive();
client.login(process.env.TOKEN).catch((err) => {
  console.error("Login Error:", err);
});
