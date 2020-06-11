function connect(mongoose, path, config, logger) {
  try {
    mongoose.connect(path, config);
  } catch (err) {
    logger.error("Error connecting to mongodb");
    logger.error(err);
  }
}

module.exports = connect;
