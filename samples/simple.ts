import { parse } from '../src/index'
import { num, str } from '../src/parsers'

const res = parse('abc12', str('a'), str('bc'), num(1), num(2))
console.log(res)

const res2 = parse('abc12', str('A'))
console.log(res2)
