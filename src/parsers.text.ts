import words from 'lodash.words'
import { Parser, ParserFailure, ParserSuccess } from '.'
import { or, pipe2 } from './operators'
import { digit, letter } from './parsers.base'

export function space(): Parser<string> {
  return (input: string) => {
    const firstChar = input.slice(0, 1)
    if (firstChar !== ' ') return new ParserFailure(`' '`, input)

    const remainder = input.slice(1)

    return new ParserSuccess(`' '`, firstChar, remainder, 1)
  }
}

export function carriageReturn(): Parser<string> {
  return (input: string) => {
    const firstChar = input.slice(0, 1)
    if (firstChar !== '\u000D') return new ParserFailure('\\u000D', input)

    const remainder = input.slice(1)

    return new ParserSuccess('\\u000D', firstChar, remainder, 1)
  }
}

export function lineFeed(): Parser<string> {
  return (input: string) => {
    const firstChar = input.slice(0, 1)
    if (firstChar !== '\u000A') return new ParserFailure('\\u000A', input)

    const remainder = input.slice(1)

    return new ParserSuccess('\\u000A', firstChar, remainder, 1)
  }
}

export function newLine(): Parser<string> {
  return or(
    pipe2(carriageReturn(), lineFeed(), (l, r) => l + r),
    or(lineFeed(), carriageReturn())
  )
}

export function tab(): Parser<string> {
  return (input: string) => {
    const firstChar = input.slice(0, 1)
    if (firstChar !== '\t') return new ParserFailure('\t', input)

    const remainder = input.slice(1)

    return new ParserSuccess('\t', firstChar, remainder, 1)
  }
}

export function whitespace(): Parser<string> {
  return or(space(), tab())
}

export function alphanumeric(): Parser<string | number> {
  return or(letter(), digit())
}

export function word(): Parser<string> {
  return input => {
    const [word, ...rest] = words(input)
    if (!word) return new ParserFailure('any word', input)

    const remainder = input.slice(0, word.length)
    return new ParserSuccess('any word', word, remainder, word.length)
  }
}
