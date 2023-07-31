require('dotenv').config();
const Discord = require("discord.js");
const { Client, GatewayIntentBits, IntentsBitField } = require("discord.js");
const cron = require("node-cron");
const client = new Client({
  intents: [
    // GatewayIntentBits.Guilds, 
    // GatewayIntentBits.GuildMessages,
    // GatewayIntentBits.MessageContent
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
],
});

const token = process.env.DISCORD_TOKEN

try {
    client.login(token);   
} catch (error) {
    console.error('Failed to log in:', error.message)
}

const questions = [
    "What did you accomplish at work yesterday?",
    "What personal achievement are you proud of outside of work?",
    "If you could travel anywhere in the world right now, where would you go?",
    "What's your favorite book that you've read recently, and why?",
    "Share a movie or TV show that you've been enjoying lately.",
    "What's the most memorable adventure you've had in the past year?",
    "Have you discovered any new hobbies or interests lately?",
    "What's the best meal you've had recently?",
    "If you could have any superpower, what would it be and why?",
    "Share a fun fact about yourself that most people don't know.",
    "What's something you've been binge-watching or binge-reading lately?",
    "If you could meet any historical figure, who would it be and what would you talk about?",
    "What's your go-to comfort food?",
    "If you had a time machine, what era would you travel to and why?",
    "What's the best piece of advice you've ever received?",
    "If you could learn a new skill instantly, what would it be and how would you use it?",
    "What's the most random or interesting fact you know?",
    "If you could have a conversation with your future self, what would you ask?",
    "Describe your perfect weekend getaway.",
    "What's the most challenging but rewarding experience you've had recently?",
    "Share a memorable moment from your childhood.",
    "What's your favorite way to relax and de-stress after a busy day?",
    "If you could attend any major event or festival, which one would you choose?",
    "What's your favorite song or artist that you've been listening to a lot lately?",
    "Share a funny or embarrassing story from your past.",
    "If you could invent any gadget, what would it do and how would it make life easier?",
    "What's your favorite way to celebrate personal achievements?",
    "If you could have dinner with any three people (dead or alive), who would you invite and why?",
    "What's one thing you've always wanted to learn but haven't had the chance to yet?",
    "Describe a dream vacation that you hope to take someday."
]

function postStandupQuestion() {
  const standupQuestion = getRandomStandupQuestion();
  const guild = client.guilds.cache.get("1134950687587967049"); //SERVER ID
  const channel = guild.channels.cache.get("1134950688208719995"); //CHANNEL ID
  if (channel) {
    channel.send(
      `@here Good morning! Standup Question for today: ${standupQuestion}`
    );
  }
}

function scheduleDailyStandupQuestion() {
//   cron.schedule('* * * * *', () => { // Every minute testing
  cron.schedule('0 15 * * 1-5', () => {
    postStandupQuestion();
  });
}

//*****WHEN BOT IS TURNED ON*****
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log("Bot is ready!")
    scheduleDailyStandupQuestion()
  });

//*****ADD NEW QUESTION*****/
client.on("messageCreate", (message) => {
    if (!message.author.bot && message.content.toLowerCase() === "!newquestion") {
        console.log('!newquestion command received...')
        const standupQuestion = getRandomStandupQuestion()
        const guild = client.guilds.cache.get("1134950687587967049"); //SERVER ID
        const channel = guild.channels.cache.get("1134950688208719995"); //CHANNEL ID
        setTimeout(() => {
            console.log('posting new question')
            channel.send(`@here Okay, here's a different question: ${standupQuestion}`)
        }, 2000)
    } 
})

function getRandomStandupQuestion() {
    const randomIndex = Math.floor(Math.random() * questions.length)
    return questions[randomIndex]
}