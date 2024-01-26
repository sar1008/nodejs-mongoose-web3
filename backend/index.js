import mongoose from "mongoose";
import config from "./config/config.js";
import logger from "./config/logger.js";
import app from "./app.js";
import initialData from "./config/initialData.js";


let server;

mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on("connecting", () => {
  logger.info("Connecting to MongoDB...");
});

db.on("error", (err) => {
  logger.error(`MongoDB connection error: ${err}`);
  mongoose.disconnect();
});

db.on("connected", () => {
  logger.info("🚀 Connected to MongoDB!");
});

db.once("open", () => {
  logger.info("🚀 MongoDB connection opened!");
});

db.on("reconnected", () => {
  logger.info("🚀 MongoDB reconnected!");
});

const connect = async () => {
  try {
    await mongoose.connect(config.DATABASE_URI, config.DATABASE_OPTIONS);
    logger.info("🚀 Connected to MongoDB end!");
    logger.info("🚀 Initial MongoDB!");
    await initialData();
    server = app.listen(config.PORT, config.HOST, () => {
      logger.info(`🚀 Host: http://${config.HOST}:${config.PORT}`);
    });
  } catch (err) {
    logger.error(`MongoDB connection error: ${err}`);
  }
};

connect();

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.warn("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (err) => {
  logger.error(err);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);