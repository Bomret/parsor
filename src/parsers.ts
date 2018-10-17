import { Parser, ParserFailure, ParserSuccess } from '.'
import { or } from './operators'

export function string(searchString: string): Parser<string> {
  return (input: string) => {
    if (!input.startsWith(searchString))
      return new ParserFailure(searchString, input)

    const remainder = input.slice(searchString.length)

    return new ParserSuccess(searchString, remainder)
  }
}

export function number(num?: number): Parser<number> {
  return (input: string) => {
    const parsedNumber = parseFloat(input)

    if (!parsedNumber)
      return new ParserFailure(num ? num.toString() : 'any number', input)
    if (num && parsedNumber !== num)
      return new ParserFailure(num.toString(), input)

    const remainder = input.slice(parsedNumber.toString().length)

    return new ParserSuccess(parsedNumber, remainder)
  }
}

export function lowerCaseLetter(): Parser<string> {
  return (input: string) => {
    const firstChar = input.slice(0, 1)
    if (!/[a-z]/.test(firstChar))
      return new ParserFailure('lowercase letter', input)

    const remainder = input.slice(1)

    return new ParserSuccess(firstChar, remainder)
  }
}

export function upperCaseLetter(): Parser<string> {
  return (input: string) => {
    const firstChar = input.slice(0, 1)
    if (!/[A-Z]/.test(firstChar))
      return new ParserFailure('uppercase letter', input)

    const remainder = input.slice(1)

    return new ParserSuccess(firstChar, remainder)
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

    return new ParserSuccess(num, remainder)
  }
}

export function space(): Parser<string> {
  return (input: string) => {
    const firstChar = input.slice(0, 1)
    if (firstChar !== ' ') return new ParserFailure(' ', input)

    const remainder = input.slice(1)

    return new ParserSuccess(firstChar, remainder)
  }
}

export function tab(): Parser<string> {
  return (input: string) => {
    const firstChar = input.slice(0, 1)
    if (firstChar !== '\t') return new ParserFailure('\t', input)

    const remainder = input.slice(1)

    return new ParserSuccess(firstChar, remainder)
  }
}

export function whitespace(): Parser<string> {
  return or(space(), tab())
}

export function alphanumeric(): Parser<string | number> {
  return or(letter(), digit())
}
