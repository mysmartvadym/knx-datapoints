const assert = require('assert')
const knxDatapoints = require('../')

suite('dpt13', () => {
  test('decode', () => {
    assert.strictEqual(knxDatapoints.decode('13.001', Buffer.from('00000000', 'hex')), -2147483648)
    assert.strictEqual(knxDatapoints.decode('13.001', Buffer.from('FFFFFFFF', 'hex')), 2147483647)

    assert.throws(() => { knxDatapoints.decode('13.001', Buffer.alloc(0)) }, Error)
    assert.throws(() => { knxDatapoints.decode('13.001', Buffer.alloc(5)) }, Error)
    assert.throws(() => { knxDatapoints.decode('13.001', undefined) }, TypeError)
  })

  test('encode', () => {
    assert.ok(knxDatapoints.encode('13.001', -2147483648).equals(Buffer.from('00000000', 'hex')))
    assert.ok(knxDatapoints.encode('13.001', 2147483647).equals(Buffer.from('FFFFFFFF', 'hex')))

    assert.throws(() => knxDatapoints.encode('13.001', -2147483649), RangeError)
    assert.throws(() => knxDatapoints.encode('13.001', 2147483648), RangeError)
  })
})
