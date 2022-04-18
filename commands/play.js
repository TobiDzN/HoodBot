const { Client } = require("discord.js");

const ytdl = require("ytdl-core");

const idk = require("ffmpeg-static");

const opts = {
  maxResults: 10,
  key: "AIzaSyApJHJWpWnBUw1Bbt2g9TIChdkTpGXRNIk",
  type: "video",
};

var servers = {};
var flag = false;
var server;
var streamConnection;

async function play(connection, message) {
  server = servers[message.guild.id];
  streamConnection = connection;
  server.dispachter = streamConnection.play(
    ytdl(server.queue[0], { filter: "audioonly" })
  );
  flag = true;

  server.dispachter.on("finish", function() {
    server.queue.shift();
    if (server.queue[0]) play(connection, message);
    else
      setTimeout(() => {
        if (!server.queue[0]) {
          connection.disconnect();
          flag = false;
        } else {
          return;
        }
      }, 10000);
  });
}

async function seek(ms) {
  const [minutes, seconds] = ms.split(":");
  const totalSeconds = +minutes * 60 + +seconds;

  const streamOptions = {
    seek: totalSeconds,
  };
  let stream = await ytdl(server.queue[0], {
    filter: "audioonly",
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  });

  streamConnection.play(stream, streamOptions);
}

skip = () => {
  server.queue.shift();
};

module.exports = {
  async execute(message, args, mode) {
    if (mode == 1) {
      if (!args[0].trim().length === 0) {
        message.channel.send("Gimme something to work with nigga!");
        return;
      } else {
        message.react("👍");
      }
    }

    if (!message.member.voice.channel) {
      message.channel.send("Join a Voice Channel");
      return;
    }

    if (!servers[message.guild.id])
      servers[message.guild.id] = {
        queue: [],
      };

    var server = servers[message.guild.id];

    if (mode == 1) {
      server.queue.push(args[0]);
      //console.log("bot played:"+args[0]);
    } else if (mode == 0) {
      await seek(args[0]);
      message.channel.bulkDelete(1, true);
    } else if (mode == 2) {
      server.queue = [];
      server.queue.push("https://www.youtube.com/watch?v=k6Ly96hHt1A");
      message.channel.bulkDelete(1, true);
      flag = false;
      //console.log("bot disconnected");
    } else if (mode == 3) {
      server.queue.push("https://www.youtube.com/watch?v=GPXkjtpGCFI");
    } else if (mode == 4) {
      server.queue.push("https://youtu.be/vPoFvYrM53w");
    } else if (mode == 5) {
      server.queue.push("https://www.youtube.com/watch?v=AxVsh4eN8hE");
    } else if (mode == 6) {
      server.queue.push("https://www.youtube.com/watch?v=l3CBfmPzimY");
    } else if (mode == 7) {
      await find(args);
    } else if (mode == 8) {
      server.queue.push("https://www.youtube.com/watch?v=I1uGKLsMiDo");
    } else if (mode == 9) {
      server.queue.shift();
      if (server.queue[0]) play(streamConnection, message);
      else {
        setTimeout(() => {
          streamConnection.disconnect();
          flag = false;
        }, 1000);
      }
      message.channel.bulkDelete(1, true);
    }
    else if (mode == 10) {
      server.queue.push("https://www.youtube.com/watch?v=v-cHFgScNVc");
    }
    else if(mode == 11){
      server.queue.push("https://www.youtube.com/watch?v=8dENYJbN1z4");
    }
    else if(mode == 12)
    {
      server.queue.push("https://www.youtube.com/shorts/bZWzm3aFhTU");
    }

    if (!message.member.voice.connection) {
    }
    message.member.voice.channel.join().then(function(connection) {
      if (!flag) {
        play(connection, message);
      }
    });

    async function find(whattosearch) {
      let filter = (m) => m.author.id === message.author.id;
      var array = [];
      for (let i = 0; i < whattosearch.length; i++) {
        array[i] = whattosearch[i];
      }
      let output = array.join(" ");
      let query = output;
      let results = await search(query, opts).catch((err) => console.log(err));

      if (results) {
        let youtubeResults = results.results;
        let i = 0;
        let titles = youtubeResults.map((result) => {
          i++;
          return i + ") " + result.title;
        });
        message.channel
          .send({
            embed: {
              title:
                "This is what i've found for you.\nSelect which song would you like me to play.",
              description: titles.join("\n"),
              timestamp: new Date(),
              footer: {
                text: `By: Tobi & Hebrew`,
              },
            },
          })
          .catch((err) => console.log(err));

        filter = (m) =>
          m.author.id === message.author.id &&
          m.content >= 1 &&
          m.content <= youtubeResults.length &&
          !isNaN(m.content);
        let collected = await message.channel.awaitMessages(filter, { max: 1 });
        let selected = youtubeResults[collected.first().content - 1];
        message.channel.bulkDelete(3, true);

        message.channel.send({
          embed: {
            color: 0x0099ff,
            title: `Adding to Queue:\n${selected.title}`,
            description: `${selected.description}`,
            url: `${selected.link}`,
            thumbnail: {
              url: `${selected.thumbnails.default.url}`,
            },
            timestamp: new Date(),
            footer: {
              text: `Requested by: ${message.author.username}`,
            },
          },
        });
        message.member.voice.channel.join();
        var link = `${selected.link}`;
        server.queue.push(link);
      }
    }
  },
  getName(message, args) {
    return this.name;
  },
  getDescription(message, args) {
    return this.description;
  },
};
