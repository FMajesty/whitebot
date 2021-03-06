const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandTempban extends DiscordCommand {

  constructor(subsystem) {
    super("tempban", "дать временный бан человеку.", 'tempban', subsystem);
  }

  onRun(message, permissions, args) {
    var config = this.subsystem.manager.getSubsystem("Config").config;
    if (args.length < 1) {
      message.reply("\nИспользование: `" + config.discord_command_character + "tempban [@UserName] [Minutes] <reason>`");
      return;
    }

    var user = undefined;

    for (var auser of message.mentions.users.array()) {
      user = auser;
      break;
    }

    if (user == undefined) {
      message.reply("\nНе могу найти его!");
      return;
    }

    var minutes = args[1];

    if (isNaN(minutes)) {
      message.reply(minutes + " is not a valid integer.");
      return;
    }

    args.shift();

    var guildMember = message.guild.fetchMember(user);
    guildMember.then(
      resolve => {
        args.shift();

        var reason = "Нет причины.";

        if (args.length > 0) {
          reason = args.join(" ");
        }
        var banStatus = this.subsystem.banManager.ban(resolve, reason, minutes);

        if (banStatus) {
          this.subsystem.logger.log("info", message.author.username + "#" + message.author.discriminator + " (" + message.author.id + ") banned " + resolve.author.username + "#" + resolve.author.discriminator + " (" + resolve.author.id + ") for " + minutes + " minutes for \"" + reason + "\".");
          message.reply("\nЗабанен.");
        }
        else {
          message.reply("\nНе могу забанить.");
        }
      },
      (reject) => {
        message.reply("\nНе могу найти");
      }
    );
  }

}

module.exports = DiscordCommandTempban;
