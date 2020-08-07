const {MessageEmbed} = require('discord.js');
const animequote = require('animequote');
const {branding} = require('../config.json').colors;
const {images} = require('../config.json');

module.exports = {
    name: "anime-quote",
    description: "Get a random anime quote!",
    aliases: ["aq"],
    usage: "",
    category: "anime",

    async senko(client, message, args) {
        var quote = animequote();
        let embed = new MessageEmbed()
        .setColor(branding)
        .setDescription(`"${quote.quotesentence}"\n - ${quote.quotecharacter}\nFrom ${quote.quoteanime}`)
        .setImage(images[1])
        return message.channel.send(embed).catch(err => err);
    }
}