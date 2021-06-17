const Discord = require('discord.js');

const { Client, MessageEmbed } = require('discord.js');

const client = new Discord.Client();

const prefix ='!';

const fs = require('fs');

const welcome = require("./welcome");

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
const command = require(`./commands/${file}`);

client.commands.set(command.name, command);
}

client.once('ready',()=>{
    console.log('Hood is online!');

    welcome(client);
});

client.on('message',message=>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
    client.commands.get('ping').execute(message,args);
    }
    else if(command==='timer'){
      
    }
    else if(command === 'flawlessvictory')
    {
    client.commands.get('flawlessvictory').execute(message,args);
    }
    else if(command === 'help')
    {
        const embed = new MessageEmbed()
        .setTitle('My Commands:')
        .setColor(0xff0000)
        .setDescription('!'+client.commands.get('ping').name+'-'+client.commands.get('ping').description+'\n'+
        '!'+client.commands.get('timer').name+'-'+client.commands.get('timer').description
        );
        message.channel.send(embed);
        message.react('👍');
    }
    else if(command === 'yoshi')
    {
        message.channel.send('https://cdn.discordapp.com/emojis/611546554838417439.gif?v=1');
    }

});




client.login(process.env.token);