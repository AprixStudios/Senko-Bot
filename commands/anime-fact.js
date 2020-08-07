const animeFact = require('anime-facts');
const {branding} = require('../config.json').colors;
const {images} = require('../config.json');
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: "anime-fact",
    description: "Get an anime fact!",
    category: "anime",
    aliases: ["fact"],
    usage: "",

    async senko(client, message, args) {
        let embed = new MessageEmbed()
        .setColor(branding)
        .setDescription(animeFact.facts())
        .setImage(images[1])

        return message.channel.send(embed).catch(err => err);
    }
}