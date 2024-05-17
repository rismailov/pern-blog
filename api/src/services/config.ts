import dotenv from 'dotenv'

dotenv.config()

export default {
    VERSION: 1,
    PORT: 4000,
    APP_ENV: process.env.APP_ENV || 'development',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
    AWS: {
        S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME || '',
        S3_REGION: process.env.AWS_S3_REGION || '',
        ACCESS_KEY: process.env.AWS_ACCESS_KEY || '',
        SECRET_KEY: process.env.AWS_SECRET_KEY || '',
    },
}
