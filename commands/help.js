const { Client } = require("discord.js");

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
const command = require(`./commands/${file}`);

client.commands.set(command.name, command);
}

module.exports={
        name:'ping',
        description:"this is a ping command!",
        execute(message,args)
      {
         const embed = new MessageEmbed()
        .setTitle('My Commands:')
        .setColor(0xff0000)
        .setDescription('!'+client.commands.get('ping').name+client.commands.get('ping').description);
        message.channel.send(embed);
        message.react('👍');
      }
}