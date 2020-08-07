const {MessageEmbed} = require('discord.js');
const imageDownloader = require('image-downloader');
const deepai = require('deepai')
const config = require('../config.json');

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
        //imageDownloader.image({url: attachment.url, dest: './tmpimgs'}).then(async ({filename}) => {
        console.log('a')
        deepai.setApiKey(config.deepaiApiKey);
        
        var resp = await deepai.callStandardApi("content-moderation", {image: attachment.url});
        console.log(resp);
        return message.channel.send(resp);
        //});
    }
}