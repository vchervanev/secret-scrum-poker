import { tryParseCommand } from '.'

describe('tryParseCommand', () => {
  it('returns null when input is not a JSON', () => {
    expect(tryParseCommand('abc')).toBeNull()
  })

  it('returns null when input is not a command', () => {
    expect(tryParseCommand('{"abc": 22}')).toBeNull()
  })

  it('returns command and attrs when present', () => {
    const input = '{"command": "do-it", "attrs": { "value": 1}}'
    const command = { command: 'do-it', attrs: { value: 1 } }
    expect(tryParseCommand(input)).toMatchObject(command)
  })

  it('ignores unknown properties', () => {
    const input = '{"command": "mini", "extra": { "value": 1}}'
    const command = { command: 'mini', attrs: {} }
    expect(tryParseCommand(input)).toMatchObject(command)
  })
})
