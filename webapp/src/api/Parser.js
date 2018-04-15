const tryParseCommand = text => {
  try {
    const payload = JSON.parse(text)
    let result = null

    if (payload.hasOwnProperty('command')) {
      result = {
        command: payload.command,
        attrs: payload.attrs || {},
      }
    }
    return result
  } catch (SyntaxError) {
    return null
  }
}

export default tryParseCommand
