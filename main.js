const Discord = require('discord.js');

const { Client, MessageEmbed } = require('discord.js');

const client = new Discord.Client();

const ytdl = require("ytdl-core");

const idk = require ("ffmpeg-static");

const prefix ='!';

const fs = require('fs');
const flawlessvictory = require('./commands/flawlessvictory');
const ping = require('./commands/ping');
const timer = require('./commands/timer');

const welcome = require("./welcome");

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
const command = require(`./commands/${file}`);

client.commands.set(command.name, command);

}

var servers = [];

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
    var locald = (d.getHours()+3)+":"+(d.getMinutes())+":"+(d.getSeconds());
    if(d.getHours()<10)
    {
        locald = ("0"+d.getHours()+3)+":"+(d.getMinutes())+":"+(d.getSeconds());
    }
    else if(d.getMinutes()<10)
    {
        locald = (d.getHours()+3)+":0"+(d.getMinutes())+":"+(d.getSeconds());
    }
    else if(d.getSeconds()<10)
    {
        locald = (d.getHours()+3)+":"+(d.getMinutes())+":0"+(d.getSeconds());
    }
    
    if(command === 'ping'){
    client.commands.get('ping').execute(message,args);
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
        const cmds = [client.commands.get('ping'), client.commands.get('timer'), client.commands.get('flawlessvictory')];

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
    else if(command==='KEKW')
    {
        messsage.channel.send('https://cdn.discordapp.com/emojis/709292051895681096.png?v=1');
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
        }, 2000);
        
       
    }
    



});




client.login(process.env.token);