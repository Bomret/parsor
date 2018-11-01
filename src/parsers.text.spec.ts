import chai from 'chai'
import { carriageReturn, lineFeed, newLine, word } from './parsers.text'
import { ParserFailure, ParserSuccess } from './types'

const expect = chai.expect

describe('parsers.text', () => {
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

  describe('word', () => {
    it('should parse the first word of a multi-word string', () =>
      expect(word()('one, two')).to.deep.equal(
        new ParserSuccess('any word', 'one', ', two', 3)
      ))

    it('should parse the only word of a string', () =>
      expect(word()('one')).to.deep.equal(
        new ParserSuccess('any word', 'one', '', 3)
      ))

    it('should fail to parsean empty string', () =>
      expect(word()('')).to.deep.equal(new ParserFailure('any word', '')))
  })
})
