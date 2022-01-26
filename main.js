const mySecret = process.env['TOKEN']
const Discord = require('discord.js');

const { Client, MessageEmbed } = require('discord.js');

const client = new Discord.Client();

const ytdl = require("ytdl-core");

const idk = require ("ffmpeg-static");


const prefix ='!';

const fs = require('fs');
const flawlessvictory = require('./commands/flawlessvictory');
const ping = require('./commands/clear');
const timer = require('./commands/timer');

const welcome = require("./welcome");

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
const command = require(`./commands/${file}`);

client.commands.set(command.name, command);

}

var servers = [];


const keepAlive = require('./server.js');

client.once('ready',()=>{
    console.log('Hood is online!');
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

client.on('message',message=>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
 
    let args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();

    var d = new Date();
    var hours = (d.getHours()+2);
    var minuets = (d.getMinutes());
    var seconds = (d.getSeconds());
    var locald = ""+(hours+":"+minuets+":"+seconds);
    if(d.getHours()<10)
    {
        locald = ""+("0"+hours)+":"+(minuets)+":"+(seconds);
    }
    else if(d.getMinutes()<10)
    {
        locald = ""+(hours)+":0"+(minuets)+":"+(seconds);
    }
    else if(d.getSeconds()<10)
    {
        locald = ""+(hours)+":"+(minuets)+":0"+(seconds);
    }
    
    if(command === 'clear'){
    client.commands.get('clear').execute(message,args);
    }
    else if(command==='timer'){
      client.commands.get('timer').execute(message,args);
    }
    else if(command === 'flawlessvictory')
    {
    client.commands.get('flawlessvictory').execute(message,args);
    }
    else if(command === 'help')
    {
        const cmds = [client.commands.get('play'), client.commands.get('flawlessvictory'),client.commands.get('timer'),client.commands.get('clear')];

        var helps=" ";

        for(var i=0;i<cmds.length;i++)
        {
            helps=helps + '!'+ cmds[i].getName() +' - '+cmds[i].getDescription() +'\n'
        };
        const embed = new MessageEmbed()
        .setTitle('My Commands:')
        .setColor(0xff0000)
        .setDescription(helps); 
        message.channel.send(embed);
        message.react('👍');
    }
    else if(command === 'yoshi')
    {
        message.channel.send('https://cdn.discordapp.com/emojis/611546554838417439.gif?v=1');
    }
    else if(command === 'burn')
    {
        message.channel.send('https://tenor.com/view/end-this-mans-career-gif-15373383');
    }
    else if(command==='kekw')
    {
        message.channel.send('<:kekw:859119387255373845>');
    }
    else if(command === 'play'||command === 'p')
    {
        client.commands.get('play').execute(message,args,1);
        console.log("bot played:"+args[0]+" @"+locald);
    }
    else if(command === 'dc')
    {
        client.commands.get('play').execute(message,args,2);
        console.log("bot disconnected @"+locald);
        setTimeout(() => { 
        message.member.voice.channel.leave();
        message.channel.send("Cya dog!");
        message.react('👋');
        }, 3000);
        
       
    }
    else if(command === "time")
    {
        message.channel.send(locald);
    }
    else if(command === "roast")
    {
      client.commands.get('play').execute(message,args,3);
      console.log("bot played:"+args[0]+" @"+locald);
      message.react('🔥');
    }
    else if(command === "fiddleimpression")
    {
      client.commands.get('play').execute(message,args,4);
      console.log("bot played:"+args[0]+" @"+locald);
    }
    else if(command === "ohhh")
    {
      client.commands.get('play').execute(message,args,5);
      console.log("bot played:"+args[0]+" @"+locald);
    }
    else if(command === "sexybanana")
    {
      client.commands.get('play').execute(message,args,6);
      console.log("bot played:"+args[0]+" @"+locald);
    }
    else if(command === "boots")
    {
      message.channel.send("https://cdn.discordapp.com/attachments/488293697935376406/930526115116744784/edge-of-night-46x.webp");
    }



});



keepAlive();
client.login(mySecret);