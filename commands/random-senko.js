const {MessageEmbed} = require('discord.js');
const {images} = require('../config.json');
const {branding} = require('../config.json').colors;

module.exports = {
    name: "random-senko",
    description: "Get a random Senko Picture!",
    category: "image",
    aliases: ["get-senko", "senko-pic"],
    usage: "",

    async senko(client, message, args) {
        var x = Math.round(Math.random()*images.length-1);
        if (x<0) x=0;
        let embed = new MessageEmbed()
        .setColor(branding)
        .setImage(images[x])
        return message.channel.send(embed).catch(err => err);
    }
}