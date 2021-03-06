const Discord = require('discord.js');

class Utils {
    constructor (client) {
        this.client = client;
    }
    
    // Get User Function
    async getUser(mention) {
        return new Promise(resolve => {
            if (!mention) return resolve();
            if (mention.startsWith('<@') && mention.endsWith('>')) {
                // if it is a mention it will do this
                mention = mention.slice(2, -1);
                if (mention.startsWith('!')) {
                    mention = mention.slice(1);
                }
                return resolve(this.client.users.cache.get(mention));
            }
            else if (this.client.users.cache.get(mention)) {
                // if it is a id it will do this
                return resolve(this.client.users.cache.get(mention));
            } else {
                // if it isn't either of them it will do this
                if (this.client.users.cache.find(u => u.tag.toLowerCase().startsWith(mention.toLowerCase()))) {
                    // if it can find a user from the input it will do this
                    return resolve(this.client.users.cache.find(u => u.tag.toLowerCase().startsWith(mention.toLowerCase())));
                }
                else {
                    // if not it wont do anything
                    return resolve();
                }
            }
        });
    }

    // Get Role Function
    async getRole(mention, roles) {
        return new Promise(resolve => {
            if (!mention) return resolve();
            if (mention.startsWith('<&') && mention.endsWith('>')) {
                // if it is a mention it will do this
                mention = mention.slice(2, -1);
                if (mention.startsWith('!')) {
                    mention = mention.slice(1);
                }
                return resolve(roles.cache.get(mention));
            }
            else if (roles.cache.get(mention)) {
                // if it is a id it will do this
                return resolve(roles.cache.get(mention));
            } else {
                // if it isn't either of them it will do this
                if (roles.cache.find(r => r.name.toLowerCase().startsWith(mention.toLowerCase()))) {
                    // if it can find a role from the input it will do this
                    return resolve(roles.cache.find(r => r.name.toLowerCase().startsWith(mention.toLowerCase())));
                }
                else {
                    // if not it wont do anything
                    return resolve();
                }
            }
        });
    }

    // Get Channel Function
    async getChannel(mention, channels) {
        return new Promise(resolve => {
            if (!mention) return resolve();
            if (mention.startsWith('<#') && mention.endsWith('>')) {
                // if it is a mention it will do this
                mention = mention.slice(2, -1);
                if (mention.startsWith('!')) {
                    mention = mention.slice(1);
                }
                return resolve(channels.cache.get(mention));
            }
            else if (channels.cache.get(mention)) {
                // if it is a id it will do this
                return resolve(channels.cache.get(mention));
            } else {
                // if it isn't either of them it will do this
                if (channels.cache.find(c => c.name.toLowerCase().startsWith(mention.toLowerCase()))) {
                    // if it can find a channel from the input it will do this
                    return resolve(channels.cache.find(c => c.tag.toLowerCase().startsWith(mention.toLowerCase())));
                }
                else {
                    // if not it wont do anything
                    return resolve();
                }
            }
        });
    }

    // Get Time Function
    async getTime(s) {
        // make the variables
        let ms = s % 1000;
        s = (s - ms) / 1000;
        let secs = s % 60;
        s = (s - secs) / 60;
        let mins = s % 60;
        s = (s - mins) / 60
        let hours = s % 24;
        let days = (s - hours) / 24;
    
        // put them together
        // it works I swear
        let displayTime;
        if (secs >= 10) displayTime = secs;
        else if (secs <= 9) displayTime = `0${secs}`;

        if (mins >= 10) displayTime = `${mins}:${displayTime}`;
        else if (mins <= 9) displayTime = `0${mins}:${displayTime}`;

        if (hours >= 10) displayTime = `${hours}:${displayTime}`;
        else if (hours <= 9) displayTime = `0${hours}:${displayTime}`;

        if (days > 0) displayTime = `${days}:${displayTime}`;

        return displayTime;

        //return `${hours}:${mins}:${secs}`;
    }

    async setTime(time) {
        let times = ['s', 'm', 'h', 'd', 'w'];
        return new Promise(resolve => {
            if (!time || !times.some(letter => time.toLowerCase().endsWith(letter)) || isNaN(time.slice(0,-1))) {
                return resolve(null);
            } else if (times.some(letter => time.toLowerCase().endsWith(letter)) && !isNaN(time.slice(0,-1))) {
                let timeInd;
                let timeAt = time.slice(-1);
                if (timeAt === 's') timeInd = 1000;
                if (timeAt === 'm') timeInd = 60000;
                if (timeAt === 'h') timeInd = 3600000;
                if (timeAt === 'd') timeInd = 86400000;
                if (timeAt === 'w') timeInd = 86400000*7;
                let timeMs = time.slice(0,-1);
                let timeMsAdd = timeMs*timeInd;
                let timeMS = Date.now()+timeMsAdd;
                return resolve(timeMS);
            }
        });
    }

    async getPages(fullArr, pageNum) {
        let multiNum = Math.ceil(pageNum)-1;
        let startNum = multiNum*5;
        let pages = Math.floor(fullArr.length/5) >= multiNum ? fullArr.slice(startNum,startNum+5) : fullArr.slice(0,5);
        await pages;
        let pagesAmount = Math.ceil(fullArr.length/5);
        let pagesObj = {pages: pages, amount: `${pageNum}/${pagesAmount}`};
        return pagesObj;
    }

    async setCleanTitle(message, embed, title) {
        if (!message.content.toLowerCase().endsWith(` -c`) && !message.content.toLowerCase().endsWith(` -clean`)) embed.setTitle(title);
    }

    async setCleanFooter(message, embed, footer) {
        if (!message.content.toLowerCase().endsWith(` -c`) && !message.content.toLowerCase().endsWith(` -clean`)) embed.setFooter(footer);
    }
}

module.exports = { Utils }