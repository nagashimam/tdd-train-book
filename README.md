# Todo アプリを作りながら TDD を学ぼう- API サーバ編 Phase4(ユニットテスト) 回答-

## 必要なパッケージのインストール

```bash
npm install mongoose --save
npm install node-mocks-http --save
```

## データモデルの定義

```TypeScript
const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["OPEN", "IN_PROGRESS", "IN_REVIEW", "DONE"],
    required: true,
  },

  // ****以下、自分で追加した属性***

  // タスクの繰り返し間隔
  repeat_interval: {
    type: String,
    enum: ["NONE", "EVERYDAY", "EVERY_WEEKDAY", "EVERY_WEEK", "EVERY_MONTH"],
    required: true,
  },

  // 締め切り
  deadline: {
    type: Date,
    required: false,
  },
});

const TodoModel = mongoose.model("Todo", TodoSchema);
module.exports = TodoModel;

```

## ダミーデータ作成

```json
{
  "title": "テストだよ",
  "description": "登録できているかのテスト",
  "status": "OPEN",
  "repeat_interval": "NONE", //自分で追加した分
  "deadline": "2020-06-09" //自分で追加した分
}
```

## TodoControllerのテスト

```TypeScript
describe("TodoController.create", () => {
  const TodoController = require("../../controllers/todo-controller");
  const TodoModel = require("../../model/todo.model");
  const newTodo = require("../mock-data/new-todo.json");
  const httpMocks = require("node-mocks-http");

  TodoModel.create = jest.fn();

  let req, res, next;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
  });

  it("should have a create function", () => {
    expect(typeof TodoController.create).toBe("function");
  });

  it("should call TodoModel.create", async () => {
    req.body = newTodo;
    await TodoController.create(req, res, next);
    expect(TodoModel.create).toBeCalledWith(newTodo);
  });

  it("should return 201 response", async () => {
    req.body = newTodo;
    await TodoController.create(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return json body in response", async () => {
    TodoModel.create.mockReturnValue(newTodo);
    await TodoController.create(req, res, next);
    expect(res._getData()).toStrictEqual(newTodo);
  });

  it("should handle model validation errors", async () => {
    const errorMessage = { message: "status property missing" };
    const rejectedPromise = Promise.reject(errorMessage);
    TodoModel.create.mockReturnValue(rejectedPromise);
    await TodoController.create(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});
```

## TodoControllerのコード

```TypeScript
const TodoModel = require("../model/todo.model");

exports.create = async (req, res, next) => {
  try {
    const createdModel = await TodoModel.create(req.body);
    res.status(201).send(createdModel);
  } catch (err) {
    next(err);
  }
};
```

## Jestの実行結果

> tdd-train-book@1.0.0 test /Users/m.nagashima/Documents/dev/tdd-train-book
> NODE_ENV=development jest --coverage --notify

 PASS  test/unit/mongodb.connecter.spec.js
 PASS  test/unit/todo.controller.spec.js
 PASS  test/sample.spec.js

----------------------------|---------|----------|---------|---------|-------------------
| File                         | % Stmts   | % Branch   | % Funcs   | % Lines   | Uncovered Line #s   |
| ---------------------------- | --------- | ---------- | --------- | --------- | ------------------- |
| All files                    | 100       | 100        | 100       | 100       |
| tdd-train-book               | 100       | 100        | 100       | 100       |
| sample.js                    | 100       | 100        | 100       | 100       |
| tdd-train-book/controllers   | 100       | 100        | 100       | 100       |
| todo-controller.js           | 100       | 100        | 100       | 100       |
| tdd-train-book/model         | 100       | 100        | 100       | 100       |
| todo.model.js                | 100       | 100        | 100       | 100       |
| tdd-train-book/mongodb       | 100       | 100        | 100       | 100       |
| mongodb.connecter.js         | 100       | 100        | 100       | 100       |
| ---------------------------- | --------- | ---------- | --------- | --------- | ------------------- |

Test Suites: 3 passed, 3 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        2.151 s
