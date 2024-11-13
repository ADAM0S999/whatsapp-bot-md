const { VERSION } = require('../config')
const bot = require('../lib/events')
const {
  textToStylist,
  PREFIX,
  getUptime,
  PLUGINS,
  getRam,
  rmComma,
  jidToNum,
  getVars,
  setVar,
} = require('../lib/')

bot.addCommand(
  {
    pattern: 'menu ?(.*)',
    fromMe: true,
    dontAddCommandList: true,
    onlyGroup: true,
  },
  async (message, match) => {
    const sorted = bot.commands.sort((a, b) => {
      if (a.name && b.name) {
        return a.name.localeCompare(b.name)
      }
      return 0
    })
    const date = new Date()
    let CMD_HELP = `╭────────────────╮
						DODO👑👑💚
╰────────────────╯

╭────────────────
│ Prefix : ${PREFIX}
│ User : ${message.pushName}
│ Time : ${date.toLocaleTimeString()}
│ Day : ${date.toLocaleString('en', { weekday: 'long' })}
│ Date : ${date.toLocaleDateString('hi')}
│ Version : ${VERSION}
│ Plugins : ${PLUGINS.count}
│ Ram : ${getRam()}
│ Uptime : ${getUptime('t')}
╰────────────────
╭────────────────
`
    sorted.map(async (command, i) => {
      if (
        command.dontAddCommandList === false &&
        command.pattern !== undefined &&
        command.onlyGroup
      ) {
        CMD_HELP += `│ ${textToStylist(command.name.toUpperCase(), 'mono')}\n`
      }
    })

    CMD_HELP += `╰────────────────`
    return await message.send('```' + CMD_HELP + '```')
  }
)

bot.addCommand(
  {
    pattern: 'setadmin ?(.*)',
    fromMe: true,
    desc: 'add replied or mentioned or given num to group admins',
    type: 'vars',
  },
  async (message, match) => {
    match = jidToNum(message.reply_message.jid || message.mention[0] || match)
    if (!match) return await message.send('Example : setadmin 9876543210 | mention | reply to msg')
    try {
      const vars = await getVars()
      const GROUP_ADMINS = rmComma(`${vars.GROUP_ADMINS || ''},${match}`)
      await setVar({ GROUP_ADMINS })
      return await message.send('```' + `GROUP_ADMINS : ${GROUP_ADMINS}` + '```')
    } catch (error) {
      return await message.send(error.message, { quoted: message.data })
    }
  }
)

bot.addCommand(
  {
    pattern: 'deladmin ?(.*)',
    fromMe: true,
    desc: 'remove replied or mentioned or given num to group admins',
    type: 'vars',
  },
  async (message, match) => {
    match = jidToNum(message.reply_message.jid || message.mention[0] || match)
    if (!match) return await message.send('Example : deladmin 9876543210 | mention | reply to msg')
    try {
      const vars = await getVars()
      const GROUP_ADMINS = rmComma(vars.GROUP_ADMINS.replace(match, ''))
      await setVar({ GROUP_ADMINS })
      await message.send('```' + `GROUP_ADMINS : ${GROUP_ADMINS}` + '```')
    } catch (error) {
      return await message.send(error.message, { quoted: message.data })
    }
  }
)

bot.addCommand(
  {
    pattern: 'getadmin ?(.*)',
    fromMe: true,
    desc: 'show group admins',
    type: 'vars',
  },
  async (message, match) => {
    try {
      const vars = await getVars()
      await message.send('```' + `GROUP_ADMINS : ${vars.GROUP_ADMINS}` + '```')
    } catch (error) {
      return await message.send(error.message, { quoted: message.data })
    }
  }
)
