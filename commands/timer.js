const { Client } = require("discord.js");
const inlinereply = require('discord-reply');
module.exports={
        name:'timer',
        description:"Prefix is !timer MINUETS SECONDS / !timer SECONDS",
        execute(message,args)
    {
     if(args[0]==null)
     {
       message.lineReply("Prefix is !timer MINUETS SECONDS / !timer SECONDS");
     }
     else if(args[1]==null)
     {
       var timeinmili = (parseInt(args[0])*1000);
       setTimeout(()=>{
         message.lineReply("TIME IS UP!");
       },timeinmili);
     }
     else if(args[1]!=null)
     {
       var timeinmili = (parseInt(args[0])*60*1000+(parseInt(args[1])*1000));
       setTimeout(()=>{
         message.lineReply("TIME IS UP!");
       },timeinmili);
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