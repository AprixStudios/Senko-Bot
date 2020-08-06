const Discord = require('discord.js');

module.exports = (client, message) => {
    async function commands() {
        var { commandHandler } = require('../functions/commandhandler.js');
        commandHandler(client, message, "senko ").catch(err => console.error(err));
    }
    commands();
}