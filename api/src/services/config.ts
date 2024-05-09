import dotenv from 'dotenv'

dotenv.config()

export default {
    version: 1,
    port: 4000,
    atlasUri: process.env.MONGO_URI || '',
}
