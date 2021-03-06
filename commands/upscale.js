const {MessageEmbed} = require('discord.js');
const deepai = require('deepai');
const config = require('../config.json');

module.exports = {
    name: "upscale",
    description: "Upscale a image.",
    aliases: [],
    usage: "<image>",
    category: "image",

    async senko(client, message, args) {
        if (!message.attachments.array()[0]) {
            let embed = new MessageEmbed()
            .setColor(config.colors.branding)
            .setDescription(`:( no attachments`)
            .setImage(config.images[0])
            return message.channel.send(embed).catch(err => err);
        }
        let msg = await message.channel.send(`Upscaling...`).catch(err => err);
        var attachment = message.attachments.array()[0];
        deepai.setApiKey(`${config.deepaiApiKey}`);
        var resp = await deepai.callStandardApi("waifu2x", {image: attachment.url});
        let embed = new MessageEmbed()
        .setColor(config.colors.branding)
        .setImage(resp.output_url)
        return message.channel.send(embed).then(() => msg.delete({timeout: 2000})).catch(err => message.channel.send(`Failed: No Embed Permissions`));
    }
}
