const randomAnime = require('random-anime');
const {MessageEmbed} = require('discord.js');
const {branding} = require('../config.json').colors;
const {images} = require('../config.json');

module.exports = {
    name: "get-wallpaper",
    description: "Get a random anime wallpaper!",
    usage: "[nsfw]",
    aliases: ["anime-pic", "get-pic"],
    category: "image",

    async senko(client, message, args) {
        if (args[0] && args[0].search(/nsfw/i)>=0) {
            if (message.channel.nsfw !== true) {
                let embed = new MessageEmbed()
                .setColor(branding)
                .setDescription(`but.. but this isn't a NSFW channel!`)
                .setImage(images[0])
                return message.channel.send(embed).catch(err => err);
            }
            let theImage = randomAnime.nsfw();
            let embed = new MessageEmbed()
            .setColor(branding)
            .setImage(theImage)
            return message.channel.send(embed).catch(err => err);
        } else {
            let theImage = randomAnime.anime();
            let embed = new MessageEmbed()
            .setColor(branding)
            .setImage(theImage)
            return message.channel.send(embed).catch(err => err);
        }
    }
}