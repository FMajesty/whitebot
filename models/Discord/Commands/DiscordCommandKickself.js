const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandKickself extends DiscordCommand {

	constructor(subsystem) {
		super("kickself", "Кикает тебя из канала.", undefined, subsystem);
	}

	onRun(message, permissions, args) {
		if (permissions.includes("kickself")) {
			message.reply("cannot kick staff");
		}
		else {
			var guildMember = message.member;
			message.channel.send(guildMember + " has kicked themself from the server");
			guildMember.kick();
		}
	}
}

module.exports = DiscordCommandKickself;
