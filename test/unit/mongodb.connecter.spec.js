describe("MongoDBへの接続", () => {
  const connecter = require("../../mongodb/mongodb.connecter");
  const path = `mongodb+srv://masato:${process.env.MONGO_ATLAS_PW}@cluster0-hhmqy.gcp.mongodb.net/test?retryWrites=true&w=majority`;
  const config = { useUnifiedTopology: true, useNewUrlParser: true };

  let mongoose;

  beforeEach(() => {
    mongoose = jest.genMockFromModule("mongoose");
  });

  test("接続処理を呼び出すこと", () => {
    mongoose.connect = jest.fn();
    connecter(mongoose, path, config, console);
    expect(mongoose.connect).toHaveBeenCalledTimes(1);
    expect(mongoose.connect).toHaveBeenCalledWith(path, config);
  });

  test("接続に失敗したら、エラーメッセージを2回表示すること。1回目は「Error connecting to mongodb」、2回目はエラー内容", () => {
    const consoleMock = jest.fn();
    consoleMock.error = jest.fn();
    const err = new Error();
    mongoose.connect = jest.fn(() => {
      throw err;
    });

    connecter(mongoose, path, config, consoleMock);
    const calls = consoleMock.error.mock.calls;
    // 1回目の呼び出しの第一引数が「Error connecting to mongodb」であること
    expect(calls[0][0]).toBe("Error connecting to mongodb");
    //2回目の呼び出しの第一引数がerrであること
    expect(calls[1][0]).toStrictEqual(err);
  });
});
