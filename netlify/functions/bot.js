const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  return ctx.reply(
    'សូមស្វាគមន៍! សូមជ្រើសរើសមុខងារខាងក្រោម៖',
    Markup.inlineKeyboard([
      [Markup.button.callback('👤 1 Account', 'btn_1_account')]
    ])
  );
});

bot.action('btn_1_account', async (ctx) => {
  await ctx.answerCbQuery();
  const user = ctx.from;
  const accountInfo = `📋 *ព័ត៌មានគណនីរបស់អ្នក (1 Account)*\n\n` +
                      `• *ឈ្មោះ:* ${user.first_name || ''} ${user.last_name || ''}\n` +
                      `• *Username:* @${user.username || 'គ្មាន'}\n` +
                      `• *User ID:* \`${user.id}\`\n` +
                      `• *ស្ថានភាព:* សកម្ម (Active)`;

  return ctx.replyWithMarkdown(accountInfo);
});

exports.handler = async (event) => {
  try {
    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body);
      await bot.handleUpdate(body);
    }
    return { statusCode: 200, body: 'OK' };
  } catch (error) {
    return { statusCode: 500, body: 'Error' };
  }
};
