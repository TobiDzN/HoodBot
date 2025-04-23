const { PermissionsBitField } = require("discord.js");

module.exports = {
  name: "clear",
  description: "Prefix is !clear [NUMBER OF MESSAGES TO CLEAR]",
  async execute(message, args) {
    if (
      !message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)
    ) {
      return message.channel.send(
        "❌ You can't use this command. Missing `Manage Messages` permission.",
      );
    }

    const amount = parseInt(args[0]);
    if (isNaN(amount) || amount <= 0) {
      return message.reply(
        "❗ Please provide a valid number of messages to delete. Usage: `!clear [number]`",
      );
    }

    if (amount > 100) {
      return message.reply(
        "⚠️ You can only delete up to 100 messages at once.",
      );
    }

    try {
      // +1 to include the command message
      const deleted = await message.channel.bulkDelete(amount + 1, true);

      const confirmation = await message.channel.send(
        `🧹 Cleared \`${deleted.size - 1}\` messages.`,
      ); // exclude the command message from report
      setTimeout(() => confirmation.delete(), 2500);
    } catch (err) {
      console.error(err);
      message.channel.send(
        "❌ Couldn't delete messages. Maybe some are older than 14 days??",
      );
    }
  },

  getName() {
    return this.name;
  },

  getDescription() {
    return this.description;
  },
};
