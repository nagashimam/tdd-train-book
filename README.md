# Todo アプリを作りながら TDD を学ぼう- API サーバ編 Phase3(最初のTDDサイクル) 回答-

## TodoControllerのテスト

```TypeScript
const TodoController = require("../../controllers/todo.controller");

describe("TodoController.create", () => {
  it("should have a create function", () => {
    expect(typeof TodoController.create).toBe("function");
  });
});
```

## Jestの実行結果

> tdd-train-book@1.0.0 test /Users/m.nagashima/Documents/dev/tdd-train-book
> NODE_ENV=development jest --coverage --notify

 PASS  test/sample.spec.js
 FAIL  test/unit/todo.controller.spec.js
  ● Test suite failed to run

    Cannot find module '../../controllers/todo.controller' from 'test/unit/todo.controller.spec.js'

    > 1 | const TodoController = require("../../controllers/todo.controller");
        |                        ^
      2 | 
      3 | describe("TodoController.create", () => {
      4 |   it("should have a create function", () => {

      at Resolver.resolveModule (node_modules/jest-resolve/build/index.js:308:11)
      at Object.<anonymous> (test/unit/todo.controller.spec.js:1:24)

-----------|---------|----------|---------|---------|-------------------
| File        | % Stmts   | % Branch   | % Funcs   | % Lines   | Uncovered Line #s   |
| ----------- | --------- | ---------- | --------- | --------- | ------------------- |
| All files   | 100       | 100        | 100       | 100       |
| sample.js   | 100       | 100        | 100       | 100       |
| ----------- | --------- | ---------- | --------- | --------- | ------------------- |
Test Suites: 1 failed, 1 passed, 2 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.501 s, estimated 1 s
Ran all test suites.
npm ERR! Test failed.  See above for more details.

## TodoControllerのコード

```TypeScript
exports.create = () => {};
```

## Jestの実効結果

> tdd-train-book@1.0.0 test /Users/m.nagashima/Documents/dev/tdd-train-book
> NODE_ENV=development jest --coverage --notify

 PASS  test/sample.spec.js
 PASS  test/unit/todo.controller.spec.js
----------------------------|---------|----------|---------|---------|-------------------
| File                         | % Stmts   | % Branch   | % Funcs   | % Lines   | Uncovered Line #s   |
| ---------------------------- | --------- | ---------- | --------- | --------- | ------------------- |
| All files                    | 100       | 100        | 50        | 100       |
| tdd-train-book               | 100       | 100        | 100       | 100       |
| sample.js                    | 100       | 100        | 100       | 100       |
| tdd-train-book/controllers   | 100       | 100        | 0         | 100       |
| todo-controller.js           | 100       | 100        | 0         | 100       |
| ---------------------------- | --------- | ---------- | --------- | --------- | ------------------- |

Test Suites: 2 passed, 2 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        0.612 s, estimated 1 s
Ran all test suites.
