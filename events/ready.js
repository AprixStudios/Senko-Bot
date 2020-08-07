module.exports = (client) => {
    console.log(`Running!`);
    client.shard.fetchClientValues('guilds.cache.size').then(results => {
        client.user.setPresence({ activity: { name: `Pampering ${results.reduce((prev, guildCount) => prev + guildCount, 0)} servers`}, ststus: "online"});
        setInterval(() => {
            client.user.setPresence({ activity: { name: `Pampering ${results.reduce((prev, guildCount) => prev + guildCount, 0)} servers`}, ststus: "online"});
        }, 600000);
    });
}