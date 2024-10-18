bot.addCommand(
  {
    pattern: 'help ?(.*)',
    dontAddCommandList: true,
  },
  async (message, match) => {
    const sorted = bot.commands.sort((a, b) => {
      if (a.name && b.name) {
        return a.name.localeCompare(b.name)
      }
      return 0
    })
    const [date, time] = getDate()
    let CMD_HELP = `╭────────────────╮
				   	ADAM
╰────────────────╯

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
`
    sorted.map(async (command, i) => {
      if (command.dontAddCommandList === false && command.pattern !== undefined) {
        CMD_HELP += `│ ${i + 1} ${addSpace(i + 1, sorted.length)}${textToStylist(
          command.name.toUpperCase(),
          'mono'
        )}\n`
      }
    })

    CMD_HELP += `╰────────────────`
    
    // Envoyer le message texte
    await message.send('```' + CMD_HELP + '```')
    
    // Envoyer l'image à partir de l'URL
    await message.send({
      image: { url: 'https://t3.ftcdn.net/jpg/04/49/19/08/360_F_449190831_i2whvIQdDIGtuIVWT6QfenWwmRApVJ5l.jpg' },
      caption: 'Voici une belle image avec l\'aide!'
    })
  }
)
