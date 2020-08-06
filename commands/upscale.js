const {MessageEmbed} = require('discord.js');
const imageDownloader = require('image-downloader');
const anime4k = require('anime4k');

module.exports = {
    name: "upscale",
    description: "Upscale a image.",
    aliases: [],
    usage: "<image>",

    async senko(client, message, args) {
        if (!message.attachments.array()[0]) {
            return message.channel.send(`:( no attachments`);
        }
        var attachment = message.attachments.array()[0];
        imageDownloader.image({url: attachment.url, dest: '/tmpimgs'}).then(async ({filename}) => {
            var theImage = require(`./${filename}`);
            var scaler = anime4k.scaler(theImage);
            scaler.inputImage(theImage);
            scaler.resize(2.0);
            return message.channel.send(scaler);
        });
    }
}