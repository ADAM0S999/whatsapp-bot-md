bot.addCommand(
  {
    pattern: 'menu ?(.*)',
    dontAddCommandList: true,
  },
  async (message, match) => {
    const commands = {}
    bot.commands.map(async (command, index) => {
      if (command.dontAddCommandList === false && command.pattern !== undefined) {
        let cmdType = command.type.toLowerCase()
        if (!commands[cmdType]) commands[cmdType] = []
        let isDiabled = command.active === false
        let cmd = command.name.trim()
        commands[cmdType].push(isDiabled ? cmd + ' [disabled]' : cmd)
      }
    })
    const [date, time] = getDate()
    
    // Message principal du menu
    let msg = `\`\`\`╭═══ LEVANTER ═══⊷
┃❃╭──────────────
┃❃│ Prefix : ${PREFIX}
┃❃│ User : ${message.pushName}
┃❃│ Time : ${time}
┃❃│ Day : ${date.toLocaleString('en', { weekday: 'long' })}
┃❃│ Date : ${date.toLocaleDateString('hi')}
┃❃│ Version : ${VERSION}
┃❃│ Plugins : ${PLUGINS.count}
┃❃│ Ram : ${getRam()}
┃❃│ Uptime : ${getUptime('t')}
┃❃│ Platform : ${getPlatform()}
┃❃╰───────────────
╰═════════════════⊷\`\`\`\n`

    if (match && commands[match]) {
      msg += ` ╭─❏ ${textToStylist(match.toLowerCase(), 'smallcaps')} ❏\n`
      for (const plugin of commands[match])
        msg += ` │ ${textToStylist(plugin.toUpperCase(), 'mono')}\n`
      msg += ` ╰─────────────────`

      // Envoyer l'image en premier, puis le menu pour cette section spécifique
      await message.send({
        image: { url: 'https://t3.ftcdn.net/jpg/04/49/19/08/360_F_449190831_i2whvIQdDIGtuIVWT6QfenWwmRApVJ5l.jpg' },
        caption: 'Voici une belle image avant le menu!'
      })

      return await message.send(msg)
    }

    // Construire tout le menu avec les commandes triées par catégorie
    for (const command in commands) {
      msg += ` ╭─❏ ${textToStylist(command.toLowerCase(), 'smallcaps')} ❏\n`
      for (const plugin of commands[command])
        msg += ` │ ${textToStylist(plugin.toUpperCase(), 'mono')}\n`
      msg += ` ╰─────────────────\n`
    }

    // Envoyer l'image avant le menu principal
    await message.send({
      image: { url: 'https://t3.ftcdn.net/jpg/04/49/19/08/360_F_449190831_i2whvIQdDIGtuIVWT6QfenWwmRApVJ5l.jpg' },
      caption: 'Voici une belle image avant le menu!'
    })

    // Envoyer le message du menu
    await message.send(msg.trim())
  }
)
