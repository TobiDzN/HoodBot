const { Client } = require("discord.js");

module.exports={
        name:'ping',
        description:"pong!",
        execute(message,args){
            message.channel.send('pong!');
    },
    getName(message,args)
    {
        return this.name;
    },
   getDescription(message,args)
   {
       return this.description;
   }
}