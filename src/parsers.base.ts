import { Parser, ParserFailure, ParserSuccess } from '.'
import { or } from './operators'

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

export function anyStringUntil(stopChar: string): Parser<string> {
  return input => {
    const index = input.indexOf(stopChar)
    if (index < 0)
      return new ParserFailure(`any string until ${stopChar}`, input)

    const expected = input.slice(0, index)
    const remainder = input.slice(index)

    return new ParserSuccess(
      `any string until ${stopChar}`,
      expected,
      remainder,
      expected.length
    )
  }
}

export function num(searchNumber: number): Parser<number> {
  return (input: string) => {
    const asString = searchNumber.toString()
    if (!input.startsWith(asString)) return new ParserFailure(asString, input)

    const charsToTake = asString.length
    const remainder = input.slice(charsToTake)

    return new ParserSuccess(asString, searchNumber, remainder, charsToTake)
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
