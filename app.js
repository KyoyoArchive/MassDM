const Discord = require('discord.js');
const figlet = require('figlet');
const colors = require('colors');
const readline = require('readline');
const commando = require(`discord.js-commando`);

const config = require('./config.json');
const bot = new commando.Client({
    commandPrefix: 'mass!',
    owner: config.id
});

const cmdsArray = [
    "dmall <message>",
    "dmrole <role> <message>"
];

bot.on("ready", () => {
    clear();
    console.log('______')
    bot.user.setActivity('Arlon', { type: 'LISTENING' })
        .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'to Arlon'}`))
        .catch(console.error);

});


bot.on("error", (error) => {
    bot.login(config.token);
});

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

bot.registry.registerGroup('dms', 'help');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

if (process.env.BOT_TOKEN) bot.login(process.env.BOT_TOKEN);
else bot.login(config.token);




function clear() {
    console.clear();
    console.log(figlet.textSync("MassDM v1.0.0f").green); // final, fixed [but not really], etc..?
    console.log(`\nRandom send time set @ 0.01-${config.wait}s`);
    console.log(` Type  ${config.prefix}help  in a chat.\n\n`);
}


/*
The only values that are not truthy in JavaScript are the following (a.k.a. falsy values):

null
undefined
0
"" (the empty string)
false
NaN
*/