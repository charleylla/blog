import { add } from "../add";

it('测试 add 方法',() => {
  expect(add(1,2)).toBe(3)
  expect(add(1,-1)).toBe(0)
})