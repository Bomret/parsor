import { parse } from '../src/index'
import { number, string } from '../src/parsers'

const res = parse('abc12', string('a'), string('bc'), number(1), number(2))
console.log(res)

const res2 = parse('abc12', string('A'))
console.log(res2)
