import { ParseFailure, Parser, ParseSuccess } from '.'

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
    if (!nr || nr !== num) return new ParseFailure(num, input)

    const remainder = input.slice(asString.length)

    return new ParseSuccess(num, remainder)
  }
}
