const {MessageEmbed} = require('discord.js');
const imageDownloader = require('image-downloader');
const waifu2x = require('waifu2x');

module.exports = {
    name: "upscale",
    description: "Upscale a image.",
    aliases: [],
    usage: "<image>",

    async senko(client, message, args) {
        if (!message.attachments) {
            return message.channel.send(`:( no attachments`);
        }
        var attachment = message.attachments.array()[0];
        imageDownloader.image({url: attachment.url, path: '../tmpimgs'}).then(async ({filename}) => {
            await waifu2x.upscaleImage(`../tmpimgs/${filename}.png`, `../tmpimgsupscaled/${filename}2x.png`);
            var upscaledImage = require(`../tmpimgsupscaled/${filename}.png`);
            return message.channel.send(upscaledImage);
        });
    }
}