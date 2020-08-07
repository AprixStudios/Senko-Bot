const randomAnimeWallpapers = require('random-anime-wallpapers');
const {MessageEmbed} = require('discord.js');
const {branding} = require('../config.json').colors;

module.exports = {
    name: "get-wallpaper",
    description: "Get a random anime wallpaper!",
    usage: "[keyword]",
    aliases: ["wallpaper"],
    category: "image",

    async senko(client, message, args) {
        if (args[0]) {
            let images = await randomAnimeWallpapers(args[0]);
            let embed = new MessageEmbed()
            .setColor(branding)
            .setImage(images[0].full)
            return message.channel.send(embed).catch(err => err);
        } else {
            let images = await randomAnimeWallpapers();
            let embed = new MessageEmbed()
            .setColor(branding)
            .setImage(images[0].full)
            return message.channel.send(embed).catch(err => err);
        }
    }
}