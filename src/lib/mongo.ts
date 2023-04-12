/* istanbul ignore file */
import mongoose from 'mongoose'
import bluebird from 'bluebird'
import util from 'util'
import config from "../config";
import logger from "../utils/logger";

const mongodbConfig = config.mongo
const uri = `mongodb://${mongodbConfig.host}:${mongodbConfig.port}/${mongodbConfig.database}?authSource=admin`

mongoose.Promise = bluebird

//  To save the logs in database
mongoose.set('debug', true)

const opts = {
  logger: logger,
  loggerLevel: 'info',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: config.mongo.useCreateIndex,
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  autoIndex: config.mongo.autoIndex,
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
}


export default class MongoConnection {
  async open(): Promise<void> {
    try {
      await mongoose.connect(uri, {
        user: mongodbConfig.user,
        pass: mongodbConfig.password,
      }).then(() => {
        logger.info(`MongoDB connected to ${uri}`)
      })
      await mongoose.connection.db.listCollections().toArray().then((collections) => {
        collections.forEach((collection) => {
          logger.info(`db.open: ${collection.name}`)
        })
      })

    } catch (err) {
      logger.error(`db.open: ${err}`)
      throw err
    }
  }

  public async close(): Promise<void> {
    try {
      await mongoose.disconnect()
    } catch (err) {
      logger.error(`db.open: ${err}`)
      throw err
    }
  }
}
