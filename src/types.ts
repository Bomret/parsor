export class ParseSuccess<T> {
  isSuccess = true

  constructor(public value: T, public remainder: string) {}
}

export class ParseFailure<T> {
  isSuccess = false

  constructor(public expected: string, public remainder: string) {}
}

export type ParseResult<T> = ParseSuccess<T> | ParseFailure<T>

export type Parser<T> = (input: string) => ParseResult<T>
