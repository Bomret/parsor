export class ParserSuccess<T> {
  isSuccess = true

  constructor(public value: T, public remainder: string) {}
}

export class ParserFailure {
  isSuccess = false

  constructor(public expected: string, public remainder: string) {}
}

export type ParseResult<T> = ParserSuccess<T> | ParserFailure

export type Parser<T> = (input: string) => ParseResult<T>
