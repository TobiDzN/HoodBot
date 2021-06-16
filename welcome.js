module.exports = (client) => {
    const channelId="488293697935376406";
    client.on("guildMemberAdd", (member) =>{
        console.log(member);
        
        const message = `Welcome to the crib <@${member.id}>`;

        const channel = member.guild.channels.cache.get(channelId);
        channel.send(message);
    });
};