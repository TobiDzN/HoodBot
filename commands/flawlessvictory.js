module.exports={
    name:'flawlessvictory',
    description:"the only access to FlawlessVictory",
    execute(message,args){
        message.channel.send('https://www.mediafire.com/file/s288wd0ktu38ers/app-debug.apk/file');
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