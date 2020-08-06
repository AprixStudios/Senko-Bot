const {MessageEmbed} = require('discord.js');
const imageDownloader = require('image-downloader');
const anime4k = require('anime4k');

module.exports = {
    name: "upscale",
    description: "Upscale a image.",
    aliases: [],
    usage: "<image>",

    async senko(client, message, args) {
        console.log(waifu2x.default)
        if (!message.attachments.array()[0]) {
            return message.channel.send(`:( no attachments`);
        }
        var attachment = message.attachments.array()[0];
        imageDownloader.image({url: attachment.url, dest: './tmpimgs'}).then(async ({filename}) => {
            var theImage = require(`./tmpimgs/${filename}.png`);
            var scaler = anime4k.scaler(theImage);
            var inputImg = new Image();
            inputImg.onLoad = function() {
                scaler.inputImage(inputImg);
                scaler.resize(2.0);
                return message.channel.send(scaler);
            }
        });
    }
}