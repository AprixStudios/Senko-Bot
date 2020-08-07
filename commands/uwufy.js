const {MessageEmbed} = require('discord.js');
const uwuifier = require('uwuifier');
const {branding} = require('../config.json').colors;
const {images} = require('../config.json');

module.exports = {
    name: "uwufy",
    description: "uwufy text uwu",
    aliases: ["uwu"],
    usage: "<message>",
    category: "misc",

    async senko(client, message, args) {
        if (!args[0]) {
            let embed = new MessageEmbed()
            .setColor(branding)
            .setDescription(`but.. but.. I need to know what to uwufy!`)
            .setImage(images[0])
            return message.channel.send(embed).catch(err => err);
        }
        var uwufied = uwufier.uwuifySentence(args.join(' '));
        let embed = new MessageEmbed()
        .setColor(branding)
        .setDescription(uwufied)
        .setImage(images[1])
        return message.channel.send(embed).catch(err => err);
    }
}