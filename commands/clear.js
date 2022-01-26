const { Client } = require("discord.js");
const inlinereply = require('discord-reply');
module.exports={
        name:'clear',
        description:"Prefix is !clear [NUMBER OF MESSAGES TO CLEAR]",
        execute(message,args){
           
          if (!message.member.hasPermission('MANAGE_MESSAGES')) {
      return message.channel
        .send(
          "You cant use this command since you're missing `manage_messages` perm",
        );
    }
    if(args[0]==null)
    {
      message.lineReply("Prefix is !clear [NUMBER OF MESSAGES TO CLEAR]");
    }
    else if(args[0]!=null)
    {
    const amount = parseInt(args[0]) > 100
      ? 101
      : parseInt(args[0]) + 1;

    message.channel.bulkDelete(amount, true)
    .then((_message) => {
      message.channel
        .send(`Bot cleared \`${_message.size}\` messages :broom:`)
        .then((sent) => {
          setTimeout(() => {
            sent.delete();
          }, 2500);
        });
    });
    }
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