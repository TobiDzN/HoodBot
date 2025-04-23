const { Client, GatewayIntentBits } = require("discord.js");

module.exports = (client) => {
    const channelId = "987360773317746688"; // Your channel ID

    client.on("guildMemberAdd", (member) => {
        const channel = member.guild.channels.cache.get(channelId);

        // Custom welcome message
        const messages = [
            `Welcome to the crib <@${member.id}>`,
            `A new homie has arrived <@${member.id}>`,
            `Look who’s here! <@${member.id}>`,
            `We knew you'd come here one day <@${member.id}>`,
            `You better brought pizza with you <@${member.id}>`,
        ];

        // Choose a random welcome message
        const randomMessage =
            messages[Math.floor(Math.random() * messages.length)];

        // Send the custom welcome message
        if (channel) channel.send(randomMessage);
    });

    client.on("guildMemberRemove", (member) => {
        const channel = member.guild.channels.cache.get(channelId);

        // Custom goodbye message
        const messages = [
            `<@${member.id}> Is a Lamo and left the Server boo!`,
            `<@${member.id}> Yeah! and dont come back`,
            `<@${member.id}> Pff he ran away`,
            `<@${member.id}> Left the crib, sad times...`,
            `<@${member.id}> Said goodbye, but the party ain't over!`,
        ];

        // Choose a random goodbye message
        const randomMessage =
            messages[Math.floor(Math.random() * messages.length)];

        // Send the custom goodbye message
        if (channel) channel.send(randomMessage);
    });
};
