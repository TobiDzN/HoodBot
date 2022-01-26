const { Client } = require("discord.js");

const ytdl = require("ytdl-core");

const idk = require ("ffmpeg-static");

module.exports={
        name:'play',
        description:"Plays a song with provided link! - !play/!p <url>",
        execute(message,args,mode){
            var servers = [];
            
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
        if(mode==1){
          if(!args[0]||!args[0].startsWith("https")){
            message.channel.send("Gimme a link brotha!");
            return;
            }
            else{ 
            message.react('👍');
         }
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

        if(mode == 1){
        server.queue.push(args[0]);
        //console.log("bot played:"+args[0]);
        }
        else if(mode == 2)
        {
        server.queue.push("https://www.youtube.com/watch?v=k6Ly96hHt1A");
        //console.log("bot disconnected");
        }
        else if(mode == 3)
        {
          server.queue.push("https://www.youtube.com/watch?v=GPXkjtpGCFI");
        }
        else if(mode == 4)
        {
          server.queue.push("https://youtu.be/vPoFvYrM53w");
        }
        else if(mode == 5)
        {
          server.queue.push("https://www.youtube.com/watch?v=AxVsh4eN8hE");
        }
        else if(mode ==6)
        {
          server.queue.push("https://www.youtube.com/watch?v=l3CBfmPzimY");
        }


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