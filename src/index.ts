import { Parser, ParseResult, ParserReply, ParserSuccess } from './types'

export * from './types'

export function isSuccess<T>(res: ParserReply<T>): res is ParserSuccess<T> {
  return res.isSuccess
}

export function parse(str: string, ...parser: Parser<any>[]): ParseResult {
  let i = str
  const results: any[] = []

  for (const p of parser) {
    const res = p(i)

    results.push(res)

    if (!isSuccess(res)) {
      return new ParseResult(
        results.length > 1 ? 'PartialSuccess' : 'Failure',
        results
      )
    }

    i = res.remainder
  }

  return new ParseResult('Success', results)
}
