import { Parser, ParserFailure, ParserSuccess } from '.'
import { or, pipe2 } from './operators'

// copied from the FParsec pfloat parser
const NumberRegex = /^[+-]?([0-9]+)(\.[0-9]+)?([eE][+-]?[0-9]+)?/

export function str(searchString: string): Parser<string> {
  return (input: string) => {
    if (!input.startsWith(searchString))
      return new ParserFailure(searchString, input)

    const charsToTake = searchString.length
    const remainder = input.slice(charsToTake)

    return new ParserSuccess(searchString, searchString, remainder, charsToTake)
  }
}

export function num(number: number): Parser<number> {
  return (input: string) => {
    const asString = number.toString()
    if (!input.startsWith(asString)) return new ParserFailure(asString, input)

    const charsToTake = asString.length
    const remainder = input.slice(charsToTake)

    return new ParserSuccess(asString, number, remainder, charsToTake)
  }
}

export function lowerCaseLetter(): Parser<string> {
  return (input: string) => {
    const firstChar = input.slice(0, 1)
    if (!/[a-z]/.test(firstChar))
      return new ParserFailure('lowercase letter', input)

    const remainder = input.slice(1)

    return new ParserSuccess('lowercase letter', firstChar, remainder, 1)
  }
}

export function upperCaseLetter(): Parser<string> {
  return (input: string) => {
    const firstChar = input.slice(0, 1)
    if (!/[A-Z]/.test(firstChar))
      return new ParserFailure('uppercase letter', input)

    const remainder = input.slice(1)

    return new ParserSuccess('uppercase letter', firstChar, remainder, 1)
  }
}

export function letter(): Parser<string> {
  return or(lowerCaseLetter(), upperCaseLetter())
}

export function digit(): Parser<number> {
  return (input: string) => {
    const firstChar = input.slice(0, 1)
    const num = parseInt(firstChar, 10)
    if (!num) return new ParserFailure('any digit', input)

    const remainder = input.slice(1)

    return new ParserSuccess('any digit', num, remainder, 1)
  }
}

export function number(): Parser<number> {
  return input => {
    const match = input.match(NumberRegex)
    if (!match) return new ParserFailure('any number', input)

    const charsToTake = match[0].length
    const remainder = input.slice(charsToTake)

    return new ParserSuccess(
      'any number',
      parseFloat(match[0]),
      remainder,
      charsToTake
    )
  }
}

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
