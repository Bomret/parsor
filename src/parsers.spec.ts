import chai from 'chai'
import {
  carriageReturn,
  digit,
  lineFeed,
  newLine,
  num,
  number
} from './parsers'
import { ParserFailure, ParserSuccess } from './types'

const expect = chai.expect

describe('parsers', () => {
  describe('num', () => {
    it('should parse 1 from 1a correctly', () =>
      expect(num(1)('1a')).to.deep.equal(new ParserSuccess('1', 1, 'a', 1)))

    it('should parse -1 from -1a correctly', () =>
      expect(num(-1)('-1a')).to.deep.equal(new ParserSuccess('-1', -1, 'a', 2)))

    it('should parse 1.2 from 1.2a correctly', () =>
      expect(num(1.2)('1.2a')).to.deep.equal(
        new ParserSuccess('1.2', 1.2, 'a', 3)
      ))

    it('should parse -1.2 from -1.2a correctly', () =>
      expect(num(-1.2)('-1.2a')).to.deep.equal(
        new ParserSuccess('-1.2', -1.2, 'a', 4)
      ))

    it('should parse 1.2e+3 from 1200a correctly', () =>
      expect(num(1.2e3)('1200a')).to.deep.equal(
        new ParserSuccess('1200', 1200, 'a', 4)
      ))

    it('should parse -1.2e+3 from -1200a correctly', () =>
      expect(num(-1.2e3)('-1200a')).to.deep.equal(
        new ParserSuccess('-1200', -1200, 'a', 5)
      ))
  })

  describe('number', () => {
    it('should parse 1 from 1a correctly', () =>
      expect(number()('1a')).to.deep.equal(
        new ParserSuccess('any number', 1, 'a', 1)
      ))

    it('should parse -1 from -1a correctly', () =>
      expect(number()('-1a')).to.deep.equal(
        new ParserSuccess('any number', -1, 'a', 2)
      ))

    it('should parse 1.2 from 1.2a correctly', () =>
      expect(number()('1.2a')).to.deep.equal(
        new ParserSuccess('any number', 1.2, 'a', 3)
      ))

    it('should parse -1.2 from -1.2a correctly', () =>
      expect(number()('-1.2a')).to.deep.equal(
        new ParserSuccess('any number', -1.2, 'a', 4)
      ))

    it('should parse 1.2e+3 from 1200a correctly', () =>
      expect(number()('1200a')).to.deep.equal(
        new ParserSuccess('any number', 1200, 'a', 4)
      ))

    it('should parse -1.2e+3 from -1200a correctly', () =>
      expect(number()('-1200a')).to.deep.equal(
        new ParserSuccess('any number', -1200, 'a', 5)
      ))
  })

  describe('digit', () => {
    it('should parse 1 from 1a correctly', () =>
      expect(digit()('1a')).to.deep.equal(
        new ParserSuccess('any digit', 1, 'a', 1)
      ))

    it('should parse 1 from 123 correctly', () =>
      expect(digit()('123')).to.deep.equal(
        new ParserSuccess('any digit', 1, '23', 1)
      ))

    it('should not parse negative numbers', () =>
      expect(digit()('-1a')).to.deep.equal(
        new ParserFailure('any digit', '-1a')
      ))

    it('should parse 1 from 1.2a correctly', () =>
      expect(digit()('1.2a')).to.deep.equal(
        new ParserSuccess('any digit', 1, '.2a', 1)
      ))
  })

  describe('carriageReturn', () => {
    it('should parse the cr correctly from a string', () =>
      expect(carriageReturn()('\r')).to.deep.equal(
        new ParserSuccess('\\u000D', '\r', '', 1)
      ))
  })

  describe('lineFeed', () => {
    it('should parse the lf correctly from a string', () =>
      expect(lineFeed()('\n')).to.deep.equal(
        new ParserSuccess('\\u000A', '\n', '', 1)
      ))

    it('should parse the lf correctly from a format string', () =>
      expect(
        lineFeed()(`
`)
      ).to.deep.equal(new ParserSuccess('\\u000A', '\n', '', 1)))
  })

  describe('newLine', () => {
    it('should parse the newLine correctly from a carriage return and line feed', () =>
      expect(newLine()('\r\n')).to.deep.equal(
        new ParserSuccess('\\u000D then \\u000A', '\r\n', '', 2)
      ))

    it('should parse the newLine correctly from a carriage return', () =>
      expect(newLine()('\r')).to.deep.equal(
        new ParserSuccess('\\u000D', '\r', '', 1)
      ))

    it('should parse the newLine correctly from a line feed', () =>
      expect(newLine()('\n')).to.deep.equal(
        new ParserSuccess('\\u000A', '\n', '', 1)
      ))
  })
})
