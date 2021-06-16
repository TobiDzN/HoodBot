const Discord = require('discord.js');

const client = new Discord.Client();

const prefix ='!';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
const command = require(`./commands/${file}`);

client.commands.set(command.name, command);
}

client.once('ready',()=>{
    console.log('Hood is online!');
});

client.on('message',message=>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
    client.commands.get('ping').execute(message,args);
    }
    else if(command==='timer'){
    var sec=60;
    message.channel.send(""+sec).then(msg=>msg.delete(1000));
    for(var i=0;i<sec;i++)
    {
        message.delete({timeout:1000,reason:'.'});
        sec--;
        message.channel.send(""+sec);
    }   
}

});




client.login(process.env.token);