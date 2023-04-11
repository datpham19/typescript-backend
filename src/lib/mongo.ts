/* istanbul ignore file */

import mongoose from 'mongoose'

import logger from '@src/utils/logger'
import config from "@src/config";

const mongodbConfig = config.mongo
const uri = `mongodb://${mongodbConfig.user}:${mongodbConfig.password}@${mongodbConfig.host}:${mongodbConfig.port}/${mongodbConfig.database}`

mongoose.Promise = global.Promise
mongoose.set('debug', mongodbConfig.debug !== undefined)


const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: config.mongo.useCreateIndex,
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  autoIndex: config.mongo.autoIndex,
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
}



class MongoConnection {
  private static _instance: MongoConnection

  static getInstance(): MongoConnection {
    if (!MongoConnection._instance) {
      MongoConnection._instance = new MongoConnection()
    }
    return MongoConnection._instance
  }

  public async open(): Promise<void> {
    try {

      logger.debug('connecting to mongo db: ' + uri)
      await mongoose.connect(uri, opts)

      mongoose.connection.on('connected', () => {
        logger.info('Mongo: connected')
      })

      mongoose.connection.on('disconnected', () => {
        logger.error('Mongo: disconnected')
      })

      mongoose.connection.on('error', (err) => {
        logger.error(`Mongo:  ${String(err)}`)
        if (err.name === "MongoNetworkError") {
          setTimeout(function () {
            mongoose.connect(uri, opts).catch(() => {
            })
          }, 5000)
        }
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

export default MongoConnection.getInstance()
