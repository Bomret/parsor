import { isSuccess } from '.'
import { Parser, ParserFailure, ParserSuccess } from './types'

export function bind<A, B>(
  parser: Parser<A>,
  f: (val: A) => Parser<B>
): Parser<B> {
  return input => {
    const res1 = parser(input)
    if (!isSuccess(res1)) {
      return res1
    }

    const p2 = f(res1.value)
    return p2(res1.remainder)
  }
}

export function or<A, B>(
  parser1: Parser<A>,
  parser2: Parser<B>
): Parser<A | B> {
  return input => {
    const res1 = parser1(input)
    if (isSuccess(res1)) return res1

    const res2 = parser2(input)
    if (isSuccess(res2)) return res2

    return new ParserFailure(`${res1.expected} or ${res2.expected}`, input)
  }
}

export function pipe2<A, B, C>(
  parser1: Parser<A>,
  parser2: Parser<B>,
  map: (a: A, b: B) => C
): Parser<C> {
  return (input: string) => {
    const res1 = parser1(input)
    if (!isSuccess(res1)) return res1

    const res2 = parser2(res1.remainder)
    if (!isSuccess(res2)) return res2

    const endResult = map(res1.value, res2.value)

    return new ParserSuccess(
      `${res1.expected} then ${res2.expected}`,
      endResult,
      res2.remainder,
      res1.charsConsumed + res2.charsConsumed
    )
  }
}

export function tuple2<A, B>(
  parser1: Parser<A>,
  parser2: Parser<B>
): Parser<[A, B]> {
  return pipe2<A, B, [A, B]>(parser1, parser2, (a, b) => [a, b])
}

export function pipe3<A, B, C, D>(
  parser1: Parser<A>,
  parser2: Parser<B>,
  parser3: Parser<C>,
  map: (a: A, b: B, c: C) => D
): Parser<D> {
  return pipe2(tuple2(parser1, parser2), parser3, (ab, c) =>
    map(ab[0], ab[1], c)
  )
}

export function tuple3<A, B, C>(
  parser1: Parser<A>,
  parser2: Parser<B>,
  parser3: Parser<C>
): Parser<[A, B, C]> {
  return pipe3<A, B, C, [A, B, C]>(parser1, parser2, parser3, (a, b, c) => [
    a,
    b,
    c
  ])
}
