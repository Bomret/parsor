import { Parser } from './types'

export function or<A, B>(
  parser1: Parser<A>,
  parser2: Parser<B>
): Parser<A | B> {
  return (input: string) => {
    const res1 = parser1(input)
    if (res1.isSuccess) return res1

    return parser2(input)
  }
}
