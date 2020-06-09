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
