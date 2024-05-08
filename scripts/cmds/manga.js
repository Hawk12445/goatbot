const fs = require('fs');

module.exports = {
  config: {
    name: "manga",
    version: "1.0",
    author: "Jay",
    countDown: 5,
    role: 0,
    shortDescription: "This command allows users read manga.",
    longDescription: "This command enables users to read manga",
    category: "Games",
    guide: {
      en: "To read manga , use the command '{pn} manga.' "
    }
  },

  onStart: async function ({ api, args, message }) {
    
    const [arg1] = args;

    if (!arg1) {
      message.reply("manga");
      return;
    }

     if (arg1.toLowerCase() === 'image') {
      const dareChallenges = JSON.parse(fs.readFileSync(`${__dirname}/assist_json/manga.json`));
      const randomIndex = Math.floor(Math.random() * dareChallenges.length);
      const randomChallenge = dareChallenges[randomIndex];

      message.reply(`Here's your Manga senpai: ${randomChallenge}`);
    } else {
      message.reply("Invalid input. Please use '/manga'");
    }
  }
};
