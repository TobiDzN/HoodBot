const { Client } = require("discord.js");

const ytdl = require("ytdl-core");

const idk = require ("ffmpeg-static");

module.exports={
        name:'play',
        description:"Plays a song with provided link!",
        execute(message,args){
            function play(connection, message)
        {
            var server = servers[message.guild.id];
            server.dispachter = connection.play(ytdl(server.queue[0], {filter:"audioonly"}));
            
            server.queue.shift();

            server.dispachter.on("end", function(){
                if(server.queue[0])
                {
                    play(connection, message);

                }
                else {
                    connection.disconnect();
                }
            })
        }

        if(!args[0]||!args[0].startsWith("https"))
        {
            message.channel.send("Gimme a link brotha!");
            return;
        }
        else
        {
            message.react('👍');
        }

        if(!message.member.voice.channel)
        {
            message.channel.send("Join a Voice Channel");
            return;
        }

        if(!servers[message.guild.id]) servers[message.guild.id] = {
            queue: []
        }

        var server = servers[message.guild.id];

        server.queue.push(args[0]);

        if(!message.member.voice.connection) message.member.voice.channel.join().then(function(connection){
            play(connection, message);
        })
        
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