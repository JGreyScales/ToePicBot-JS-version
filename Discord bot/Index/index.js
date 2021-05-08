// variable definement
const Discord = require('discord.js')
const bot = new Discord.Client()
const talkedRecently = new Set()
const debug = false

const random = (min = 1, max = 50) => {
    let num = Math.random() * (max - min) + min
    console.log(`diceroll number:${num}`)
    return Math.floor(num)
}

var timeout_amount = 2000
var admins = ["554486518543155212"]
var prefix = "$$"

console.log("a")

// timer function
var sleep = function(ms){
    let now = Date.now(),
        end = now + ms;
    while (now < end) {
      now = Date.now();
    }
  };

// ping commmand
function pong(message) {
    const ping_embed = new Discord.MessageEmbed()

    .setColor('#001827')
    .setTimestamp("Pong!")
    .addField('Pong!', `**(latency is ${Date.now() - message.createdTimestamp}ms: API latency ${Math.round(bot.ws.ping)}ms**)`, true)
    .setThumbnail("https://media.istockphoto.com/vectors/ping-pong-paddle-icon-vector-illustration-vector-id522732526?k=6&m=522732526&s=612x612&w=0&h=DcafbOOwSV-5Mz_FqRh0F3jJttHp1MTD7dvDhMySehw=")
    .setTimestamp()
    .setFooter("Send Toe Pic?", "https://cdn.discordapp.com/avatars/809115866226491432/79c5086e6c979219790b3879fb73ca60.png?size=4096")

    message.channel.send(ping_embed)
}

// set cooldown command
function set_cooldown(message){
    var null1 = timeout_amount
    try{timeout_amount = Number(message.content.substr(prefix.length + 9, message.content.length)) * 1000}
    catch(error){
        console.log(error)
        message.channel.send("error #2")
    }
    if (isNaN(timeout_amount)) {
        timeout_amount = null1
        message.channel.send("Please use valid characters")
        return
    }
    console.log(`Old cooldown:${null1}\t\tNew cooldown:${timeout_amount}`)
    message.channel.send(`Old cooldown:${null1}\t\tNew cooldown:${timeout_amount}`)
}

// diceroll function
function diceroll(message){


    if (message.content.length >= prefix.length + 9){ 
    try{var roll = Number(message.content.substr(prefix.length + 9, message.content.length))}
    catch(error){
        console.error()
        message.channel.send("error #1")
    }
    if (isNaN(roll)) {
        message.channel.send("please use valid characters")
        return
    } 
    var diceroll_number = random(1, roll + 1)
    if (diceroll_number > roll) {
        diceroll_number--
    }
}
 else {
     var diceroll_number = random(1, 7)
     roll = 6
     if (diceroll_number > 6){
         diceroll_number--
     }
    }
    const diceroll_embed = new Discord.MessageEmbed()
    .setThumbnail("https://media1.tenor.com/images/2fcf7e0bdb5ed04fcb5092cf2479907e/tenor.gif?itemid=4717877")
    .setColor("#000000")
    .addField("Rolling...", `Dice landed on ${diceroll_number}`)
    .setFooter(`rolled a ${roll} sided dice`)

    message.channel.send(diceroll_embed)
}

function prefix_change(message){    
    null1 = prefix
    prefix = message.content.substr(prefix.length + 7, message_content.length)
    if(isNaN(prefix) || prefix == " "){
        Discord.Message.channel.send("please Use valid characters")
        return
    } 
    message.channel.send(`Old prefix:${null1}. New prefix:${prefix}`)
}


// bot startup messages
bot.on ("ready", () => {
    console.log(`\n\nbot is up and currently signed into: ${bot.user.username}||${bot.user.id}\n`)
})


// on message commands
bot.on("message", (message) => {
    console.log("a")
    if (message.author.id == bot.user.id || !message.content.includes(prefix)){
        return
    }   
    let message_content = message.content.toLowerCase() 
    // cooldown
    if (talkedRecently.has(message.author.id)) {

        if (debug){
        console.log(`User: ${message.author.username}|${message.author.id} ||tried to run a command but is on cooldown`)  
        }
        return

    // adds user to talked recently and then proceeds to parse it over various commands
    } else  {talkedRecently.add(message.author.id)

    // ping command
    if (message_content == `${prefix}ping`){
        pong(message)
    }

    // change cooldown command
    else if (message_content.startsWith(`${prefix}cooldown`) && admins.includes(message.author.id)) {
        set_cooldown(message)
    } 

    
    else if (message_content.startsWith(`${prefix}diceroll`)) {
        console.log("a")
        diceroll(message)
    }

    else if (message_content.startsWith(`${prefix}prefix`))
    }

    // removes user from timeout after given time
    {setTimeout(() => {
        talkedRecently.delete(message.author.id)
    }, timeout_amount)}}
    

    
)
// bot token
bot.login(process.env.ToePicDiscordToken)


