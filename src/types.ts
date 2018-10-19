export class ParserSuccess<T> {
  isSuccess = true

  constructor(
    public expected: string,
    public value: T,
    public remainder: string,
    public charsConsumed: number
  ) {}
}

export class ParserFailure {
  isSuccess = false

  constructor(public expected: string, public remainder: string) {}
}

export type ParserReply<T> = ParserSuccess<T> | ParserFailure

export type Parser<T> = (input: string) => ParserReply<T>

export type ParseResultKind = 'Success' | 'PartialSuccess' | 'Failure'
export class ParseResult {
  constructor(
    public kind: ParseResultKind,
    public results: ParserReply<any>[]
  ) {}
}
