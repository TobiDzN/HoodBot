module.exports = client =>{
    client.on("guildMemberAdd", (member) =>{
        const channelId="488293697935376406"
        console.log(member);

        const message = `Welcome to the crib <@${member.id}>`
        channel.send(message);
    });
};