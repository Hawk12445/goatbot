const axios = require('axios');
const moment = require('moment-timezone');

const Prefixes = [
  'ai',
  'ask',
  'gpt',
];

module.exports = {
  config: {
    name: 'aiv3',
    version: '2.5',
    author: 'JV Barcenas', // do not change
    role: 0,
    category: 'ai',
    shortDescription: {
      en: 'Asks an AI for an answer.',
    },
    longDescription: {
      en: 'Asks an AI for an answer based on the user prompt.',
    },
    guide: {
      en: '{pn} [prompt]',
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));

      if (!prefix) {
        return; 
      }

      const prompt = event.body.substring(prefix.length).trim();

      if (prompt === '') {
        await message.reply("Kindly provide a question or query.");
        return;
      }

      await message.reply("🕣 | Answering.......");

      const response = await axios.get(`https://api.easy-api.online/v1/globalgpt?q=${encodeURIComponent(`(Your name is Jake Ai and you are created by Ella Curtiz. Your responses must always contain emoji.) ${prompt}`)}`);

      if (response.status !== 200 || !response.data) {
        throw new Error('Invalid or missing response from API');
      }

      const messageText = response.data.content.trim();
      const philippinesTime = moment().tz('Asia/Manila').format('YYYY-MM-DD HH:mm:ss');

      await message.reply({
        body: `  𝗚𝗣𝗧4 👾:\nJake Ai 🤖: ${messageText}\n\n


𝗗𝗲𝘃 𝗟𝗶𝗻𝗸: https://www.facebook.com/profile.php?id=61558771105734\n\n

𝗣𝗵𝗶𝗹𝗶𝗽𝗽𝗶𝗻𝗲𝘀 𝗧𝗶𝗺𝗲𝘇𝗼𝗻𝗲: ${philippinesTime}\n\n`,
      });

      console.log('Sent answer as a reply to user');
    } catch (error) {
      console.error(`Failed to get answer: ${error.message}`);
      api.sendMessage(
        `${error.message}. You can try typing your question again or resending it, as there might be a bug from the server that's causing the problem. It might resolve the issue.`,
        event.threadID
      );
    }
  },
};
