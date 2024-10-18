bot.addCommand(
  {
    pattern: 'help ?(.*)',
    dontAddCommandList: true,
  },
  async (message, match) => {
    const sorted = bot.commands.sort((a, b) => {
      if (a.name && b.name) {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    const [date, time] = getDate();
    let CMD_HELP = `╭────────────────╮
						ʟᴇᴠᴀɴᴛᴇʀ
╰────────────────╯

![Picture](https://images.app.goo.gl/ji7iX5UoAECy1cEH8)  <!-- Added image link here -->

╭────────────────
│ Prefix : ${PREFIX}
│ User : ${message.pushName}
│ Time : ${time}
│ Day : ${date.toLocaleString('en', { weekday: 'long' })}
│ Date : ${date.toLocaleDateString('hi')}
│ Version : ${VERSION}
│ Plugins : ${PLUGINS.count}
│ Ram : ${getRam()}
│ Uptime : ${getUptime('t')}
│ Platform : ${getPlatform()}
╰────────────────
╭────────────────
`;

    sorted.map(async (command, i) => {
      if (command.dontAddCommandList === false && command.pattern !== undefined) {
        CMD_HELP += `│ ${i + 1} ${addSpace(i + 1, sorted.length)}${textToStylist(
          command.name.toUpperCase(),
          'mono'
        )}\n`;
      }
    });

    CMD_HELP += `╰────────────────`;
    return await message.send('```' + CMD_HELP + '```');
  }
);
