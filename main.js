const Discord = require('discord.js');

const { Client, MessageEmbed } = require('discord.js');

const client = new Discord.Client();

const ytdl = require("ytdl-core");

const idk = require("ffmpeg-static");

const prefix = '!';

const fs = require('fs');
const flawlessvictory = require('./commands/flawlessvictory');
const ping = require('./commands/clear');
const timer = require('./commands/timer');
const welcome = require("./welcome");

const player = require('./commands/play')

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);

}

const keepAlive = require('./server.js');

client.once('ready', () => {
  console.log('Hood is back to the grid!');
  client.user.setActivity("You Got That Gas Money?");
  welcome(client);
});

client.on("message", message => {
  if (message.author.bot) return false;

  if (message.content.includes("@here") || message.content.includes("@everyone")) return false;

  if (message.mentions.has(client.user.id)) {
    message.channel.send("Yo Wassupp!");
  };
});

client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  let args = message.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + '/' + mm + '/' + yyyy;

  var d = new Date();
  var hours = (d.getHours() + 2);
  var minuets = (d.getMinutes());
  var seconds = (d.getSeconds());
  var locald = "" + (hours + ":" + minuets + ":" + seconds);
  if (d.getHours() < 10) {
    locald = "" + ("0" + hours) + ":" + (minuets) + ":" + (seconds);
  }
  else if (d.getMinutes() < 10) {
    locald = "" + (hours) + ":0" + (minuets) + ":" + (seconds);
  }
  else if (d.getSeconds() < 10) {
    locald = "" + (hours) + ":" + (minuets) + ":0" + (seconds);
  }

  const notRightChannel = () =>{
    if (isnotmusichannel) {
      message.channel.send("Music Commands Not Allowed Here!").then(
        setTimeout(() => {
          message.channel.bulkDelete(2, true);
        }, 3500)
      );
      return true;
    }
      return false;
  }
   

  var isnotmusichannel = message.channel.id.toString() !== "896404693125840906";

  if (command === 'clear') {
    client.commands.get('clear').execute(message, args);
  }
  else if (command === 'timer') {
    client.commands.get('timer').execute(message, args);
  }
  else if (command === 'flawlessvictory') {
    client.commands.get('flawlessvictory').execute(message, args);
  }
  else if (command === 'help') {
    const cmds = [client.commands.get('play'), client.commands.get('flawlessvictory'), client.commands.get('timer'), client.commands.get('clear')];

    var helps = " ";

    for (var i = 0; i < cmds.length; i++) {
      helps = helps + '!' + cmds[i].getName() + ' - ' + cmds[i].getDescription() + '\n'
    };
    const embed = new MessageEmbed()
      .setTitle('My Commands:')
      .setColor(0xff0000)
      .setDescription(helps);
    message.channel.send(embed);
    message.react('👍');
  }
  else if (command === 'yoshi') {
    message.channel.send('https://cdn.discordapp.com/emojis/611546554838417439.gif?v=1');
  }
  else if (command === 'burn') {
    message.channel.send('https://tenor.com/view/end-this-mans-career-gif-15373383');
  }
  else if (command === 'kekw') {
    message.channel.send('<:kekw:859119387255373845>');
  }
  else if (command === 'play' || command === 'p') {
    if(notRightChannel()) return;
    if (!args[0]) {
      message.channel.send("Gimme something to work with nigga!");
    }
    else if (args[0].startsWith('https')) {
      player.execute(message, args, 1);
    }
    else {
      player.execute(message, args, 7);
    }
    console.log("bot played:" + args[0] + " @" + locald);
  }
  else if (command === 'dc') {
      if(notRightChannel()) return;
      player.execute(message, args, 2);
      console.log("bot disconnected @" + locald);
      setTimeout(() => {
        message.member.voice.channel.leave();
      }, 3001);
    
  }
  else if (command === "time") {
    message.channel.send(locald);
  }
  else if (command === "date") {
    message.channel.send(today);
  }
  else if (command === "roast") {
    player.execute(message, args, 3);
    console.log("bot played:" + args[0] + " @" + locald);
    message.react('🔥');
  }
  else if (command === "fiddleimpression") {
    player.execute(message, args, 4);
    console.log("bot played:" + args[0] + " @" + locald);
  }
  else if (command === "ohhh") {
    player.execute(message, args, 5);
    console.log("bot played:" + args[0] + " @" + locald);
  }
  else if (command === "sexybanana") {
    player.execute(message, args, 6);
    console.log("bot played:" + args[0] + " @" + locald);
  }
  else if (command === "edgeofnight") {
    message.channel.send("https://cdn.discordapp.com/attachments/488293697935376406/930526115116744784/edge-of-night-46x.webp");
  }
  else if (command === "whatthedogdoin") {
    player.execute(message, args, 8);
    console.log("bot played:" + args[0] + " @" + locald);
  }
  else if (command === 'seek') {
    player.execute(message, args, 0);

  }
  else if (command === 'skip') {
    player.execute(message, args, 9);
  }
  else if (command === "icandoit2") {
    player.execute(message, args, 10);
    console.log("bot played:" + args[0] + " @" + locald);
  }
  else if(command === "lame")
  {
    player.execute(message, args, 11);
    console.log("bot played:" + args[0] + " @" + locald);
  }
  else if(command === "mangofork")
  {
    player.execute(message, args, 12);
    console.log("bot played:" + args[0] + " @" + locald);
  }


});

keepAlive();
client.login("ODU0NzY3MjQ1ODYyMjQwMjU2.YMouCA.E0tMlp0M5mTf7Lk4tlIZkxelFVc");

