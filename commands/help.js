const {MessageEmbed} = require('discord.js');
const {branding} = require('../config.json').colors;

module.exports = {
    name: "help",
    description: "Get help on commands.",
    usage: "[command]",
    category: "info",
    aliases: ['commands', 'cmds'],

    async senko(client, message, args) {
        prefix = "senko ";
        var argCmd = args[0];
        if (argCmd) argCmd = argCmd.toLowerCase();
        let command = client.commands.get(argCmd) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(argCmd));
        if (!command) {
            var commands = {
                image: [],
                anime: [],
                info: [],
                misc: [],
                developer: []
            };
            client.commands.map(cmd => cmd).forEach(cmd => {
                commands[cmd.category].push(cmd.name);
            });
            for (let category of Object.entries(commands)) {
                if (category[1].length === 0) category[1].push(`None`);
            }
            let embed = new MessageEmbed()
            .setColor(branding)
            .setTitle("Help")
            .setDescription(`<> = required | [] = optional\n${prefix}${this.name} ${this.usage}`)
            .addField(`Images`, commands.image.join(', '), true)
            .addField(`Anime`, commands.anime.join(', '), true)
            .addField(`Information`, commands.info.join(', '), true)
            .addField(`Misc`, commands.misc.join(', '), true)
            .addField(`Developer`, commands.developer.join(', '), true)

            return message.channel.send(embed).catch(err => {
                message.channel.send(`**Help**
<> = required | [] = optional\nI NEED EMBED PERMISSIONS FOR ALL COMMANDS!\n${prefix}${this.name} ${this.usage}
**Images**: ${commands.images.join(', ')}
**Anime**: ${commands.anime.join(', ')}
**Information**: ${commands.info.join(', ')}
**Misc**: ${commands.misc.join(', ')}
**Developer**: ${commands.developer.join(', ')}`).catch(error => error);
            });
        } else if (command) {
            let embed = new MessageEmbed()
            .setColor(branding)
            .setTitle(command.name.slice(0,1).toUpperCase() + command.name.slice(1))
            .setDescription(`${command.description}\n<> = required | [] = optional`)
            .addField(`Usage`, prefix+command.name+' '+command.usage, true)
            .addField(`Category`, command.category.slice(0,1).toUpperCase()+command.category.slice(1), true)
            .addField(`Aliases`, `${command.aliases.length > 0 ? command.aliases.join(', ') : "None" }`)

            return message.channel.send(embed).catch(err => {
                message.channel.send(`**${command.name.slice(0,1).toUpperCase() + command.name.slice(1)}**
${command.description}\n<> = required | [] = optional
**Usage**: ${prefix}${command.name} ${command.usage}
**Category**: ${command.category.slice(0,1).toUpperCase()+command.category.slice(1)}
**Aliases**: ${command.aliases > 0 ? command.aliases.join(', ') : "None"}`).catch(error => error);
            });
        }
    }
}