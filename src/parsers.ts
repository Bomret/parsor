import { ParseFailure, Parser, ParseSuccess } from '.'
import { or } from './operators'

export function string(
  searchString: string,
  ignoreCase = false
): Parser<string> {
  return (input: string) => {
    const [i, s] = ignoreCase
      ? [input.toLowerCase(), searchString.toLowerCase()]
      : [input, searchString]

    if (!i.startsWith(s)) return new ParseFailure(searchString, input)

    const remainder = input.slice(searchString.length)

    return new ParseSuccess(searchString, remainder)
  }
}

export function number(num: number): Parser<number> {
  return (input: string) => {
    const asString = num.toString()
    const toCheck = input.slice(0, asString.length)

    const nr = parseInt(toCheck, 10)
    if (!nr || nr !== num) return new ParseFailure(asString, input)

    const remainder = input.slice(asString.length)

    return new ParseSuccess(num, remainder)
  }
}

export function letter(): Parser<string> {
  return (input: string) => {
    const firstChar = input.slice(0, 1)
    if (!/[a-zA-Z]/.test(firstChar))
      return new ParseFailure('any letter', input)

    const remainder = input.slice(1)

    return new ParseSuccess(firstChar, remainder)
  }
}

export function digit(): Parser<number> {
  return (input: string) => {
    const firstChar = input.slice(0, 1)
    const num = parseInt(firstChar, 10)
    if (!num) return new ParseFailure('any digit', input)

    const remainder = input.slice(1)

    return new ParseSuccess(num, remainder)
  }
}

export function space(): Parser<string> {
  return (input: string) => {
    const firstChar = input.slice(0, 1)
    if (firstChar !== ' ') return new ParseFailure(' ', input)

    const remainder = input.slice(1)

    return new ParseSuccess(firstChar, remainder)
  }
}

export function tab(): Parser<string> {
  return (input: string) => {
    const firstChar = input.slice(0, 1)
    if (firstChar !== '\t') return new ParseFailure('\t', input)

    const remainder = input.slice(1)

    return new ParseSuccess(firstChar, remainder)
  }
}

export function whitespace(): Parser<string> {
  return or(space(), tab())
}
