const { Client } = require("discord.js");
const {
  joinVoiceChannel,
  VoiceConnectionStatus,
  createAudioPlayer,
  createAudioResource,
} = require("@discordjs/voice");
const { search } = require("yt-search");
const ytdl = require("@distube/ytdl-core");

const opts = {
  maxResults: 10,
  key: "AIzaSyApJHJWpWnBUw1Bbt2g9TIChdkTpGXRNIk", // Put your YouTube API key here
  type: "video",
};

var servers = {};
var flag = false;

async function play(connection, message) {
  const server = servers[message.guild.id];
  if (!server.queue[0]) {
    message.channel.send("No song in the queue.");
    return;
  }

  const url = server.queue[0];

  // If the URL is valid YouTube, continue playing, no need to validate again
  const stream = ytdl(url, {
    filter: "audioonly",
    quality: "highestaudio",
    opusEncoded: false, // Avoid Opus encoding if you suspect issues
    highWaterMark: 1 << 25,
  });

  const resource = createAudioResource(stream);

  const player = createAudioPlayer();
  player.play(resource);
  connection.subscribe(player);

  player.on("stateChange", (oldState, newState) => {
    if (newState.status === VoiceConnectionStatus.Idle) {
      server.queue.shift();
      if (server.queue[0]) {
        play(connection, message);
      } else {
        setTimeout(() => {
          connection.disconnect();
          delete server.connection; // <-- This is the important line!
          flag = false;
        }, 10000);
      }
    }
  });
}

async function find(query, message) {
  try {
    const results = await search(query, opts);
    if (!results || results.length === 0) {
      message.channel.send("No results found.");
      return;
    }

    const youtubeResults = results;
    let i = 0;
    const titles = youtubeResults.map((result) => {
      i++;
      return `${i}) ${result.title}`;
    });

    message.channel
      .send({
        embed: {
          title:
            "This is what I've found for you. Select which song you would like me to play.",
          description: titles.join("\n"),
          timestamp: new Date(),
          footer: {
            text: "By: Tobi & Hebrew",
          },
        },
      })
      .catch((err) => {
        console.error("Error sending embed:", err);
        message.channel.send(
          "There was an error while sending the search results.",
        );
      });

    const filter = (m) =>
      m.author.id === message.author.id &&
      m.content >= 1 &&
      m.content <= youtubeResults.length &&
      !isNaN(m.content);
    const collected = await message.channel.awaitMessages({ filter, max: 1 });
    if (!collected.size)
      return message.channel.send("No valid selection made.");

    const selected = youtubeResults[collected.first().content - 1];
    message.channel.bulkDelete(3, true);

    message.channel.send({
      embed: {
        color: 0x0099ff,
        title: `Adding to Queue: ${selected.title}`,
        description: selected.description,
        url: selected.link,
        thumbnail: {
          url: selected.thumbnails.default.url,
        },
        timestamp: new Date(),
        footer: {
          text: `Requested by: ${message.author.username}`,
        },
      },
    });

    const server = servers[message.guild.id];
    server.queue.push(selected.link);
  } catch (err) {
    console.error("Search error:", err);
    message.channel.send(
      "There was an error while searching. Please try again later.",
    );
  }
}

module.exports = {
  async execute(message, args, mode) {
    if (mode === 1) {
      if (!args[0]?.trim()) {
        message.channel.send("Gimme something to work with!");
        return;
      } else {
        message.react("👍");
      }
    }

    if (!message.member.voice.channel) {
      message.channel.send("Join a Voice Channel");
      return;
    }

    if (!servers[message.guild.id]) {
      servers[message.guild.id] = { queue: [] };
    }

    const server = servers[message.guild.id];
    let connection = null;

    // Initialize connection only if not already connected
    if (!server.connection) {
      connection = joinVoiceChannel({
        channelId: message.member.voice.channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator,
      });
      server.connection = connection;
    } else {
      connection = server.connection;
    }

    if (mode === 1) {
      if (!args[0]?.trim()) {
        message.channel.send("Gimme something to work with!");
        return;
      } else {
        message.react("👍");
      }

      const url = args[0].trim();

      const isValidUrl =
        url.startsWith("https://youtube.com") ||
        url.startsWith("https://www.youtube.com") ||
        url.startsWith("https://youtu.be");

      if (isValidUrl) {
        server.queue.push(url); // Directly add the YouTube URL to the queue
        message.channel.send(`Adding to queue: ${url}`);
      } else {
        message.channel.send(
          "Invalid YouTube URL. Make sure it starts with `https://youtube.com`, `https://www.youtube.com`, or `https://youtu.be`",
        );
        return;
      }
    } else if (mode === 0) {
      await seek(args[0]);
      message.channel.bulkDelete(1, true);
    } else if (mode === 2) {
      server.queue = [];
      server.queue.push("https://www.youtube.com/watch?v=k6Ly96hHt1A");
      message.channel.bulkDelete(1, true);
      flag = false;
    } else if (mode === 3) {
      server.queue.push("https://www.youtube.com/watch?v=GPXkjtpGCFI");
    } else if (mode === 4) {
      server.queue.push("https://youtu.be/vPoFvYrM53w");
    } else if (mode === 5) {
      server.queue.push("https://www.youtube.com/watch?v=AxVsh4eN8hE");
    } else if (mode === 6) {
      server.queue.push("https://www.youtube.com/watch?v=l3CBfmPzimY");
    } else if (mode === 7) {
      await find(args.join(" "), message); // Use all arguments as a search query
    } else if (mode === 8) {
      server.queue.push("https://www.youtube.com/watch?v=I1uGKLsMiDo");
    } else if (mode === 9) {
      server.queue.shift();
      if (server.queue[0]) play(connection, message);
      else {
        setTimeout(() => {
          connection.disconnect();
          delete server.connection; // <- Important!
          flag = false;
        }, 1000);
      }
      message.channel.send("Skipped the current song.");
      message.channel.bulkDelete(1, true);
    } else if (mode === 10) {
      server.queue.push("https://www.youtube.com/watch?v=v-cHFgScNVc");
    } else if (mode === 11) {
      server.queue.push("https://www.youtube.com/watch?v=8dENYJbN1z4");
    } else if (mode === 12) {
      server.queue.push("https://www.youtube.com/shorts/bZWzm3aFhTU");
    }

    if (!flag) {
      play(connection, message);
    }

    async function seek(ms) {
      const [minutes, seconds] = ms.split(":");
      const totalSeconds = +minutes * 60 + +seconds;

      const streamOptions = { seek: totalSeconds };
      const stream = ytdl(server.queue[0], {
        filter: "audioonly",
        quality: "highestaudio",
        highWaterMark: 1 << 25,
      });

      const resource = createAudioResource(stream, streamOptions);
      connection.play(resource);
    }
  },

  getName(message, args) {
    return this.name;
  },

  getDescription(message, args) {
    return this.description;
  },
};
