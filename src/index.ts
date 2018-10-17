import { Parser, ParseResult, ParserSuccess } from './types'

export * from './types'

export function isSuccess<T>(res: ParseResult<T>): res is ParserSuccess<T> {
  return res.isSuccess
}

export function parse(
  str: string,
  ...parser: Parser<any>[]
): ParseResult<any>[] {
  let i = str
  const results: any[] = []

  for (const p of parser) {
    const res = p(i)

    results.push(res)

    if (!isSuccess(res)) {
      return results
    }

    i = res.remainder
  }

  return results
}
