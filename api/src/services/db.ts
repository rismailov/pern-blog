import mongoose from 'mongoose'

import config from './config'

export async function connectDB() {
    try {
        await mongoose.connect(config.atlasUri)

        console.log('Connected to DB')
    } catch (error) {
        console.error('Error connecting to DB: ', error)

        process.exit(1)
    }
}

export async function disconnectDB() {
    try {
        await mongoose.disconnect()

        console.log('Disconnected from DB')
    } catch (error) {
        console.error('Error disconnecting from DB: ', error)
    }
}
