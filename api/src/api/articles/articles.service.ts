import {
    GetObjectCommand,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import crypto from 'crypto'

import config from '../../services/config'

type TFile = Express.Multer.File

const s3 = new S3Client({
    credentials: {
        accessKeyId: config.AWS.ACCESS_KEY,
        secretAccessKey: config.AWS.SECRET_KEY,
    },
    region: config.AWS.S3_REGION,
})

// a service to upload file (image) to S3 bucket
export class UploadFileService {
    file: TFile | null = null

    filename: string | null = null

    constructor(file: TFile) {
        this.file = file

        // use random strings as prefix, so that new files with
        // duplicated names don't replace the old files
        this.filename =
            crypto.randomBytes(7).toString('hex') + '-' + file.originalname
    }

    async uploadImageToS3(): Promise<boolean> {
        if (!this.file || !this.filename) {
            throw new Error('Invalid file')
        }

        const putCommand = new PutObjectCommand({
            Bucket: config.AWS.S3_BUCKET_NAME,
            Key: this.filename,
            Body: this.file.buffer,
            ContentType: this.file.mimetype,
        })

        // save the file in s3 bucket
        const saveFileResponse = await s3.send(putCommand)

        return saveFileResponse.$metadata.httpStatusCode === 200
    }

    async generateImageUrl(): Promise<string> {
        const getCommand = new GetObjectCommand({
            Bucket: config.AWS.S3_BUCKET_NAME,
            Key: this.filename as string,
        })

        const url = await getSignedUrl(s3, getCommand)

        return url
    }
}

export default class ArticleService {
    getMinutesToRead(content: string): string {
        const wordsPerMinute = 250
        const wordsCount = content.split(' ').length
        const minutesToRead = Math.ceil(wordsCount / wordsPerMinute)

        return `${minutesToRead} ${minutesToRead === 1 ? 'minute' : 'minutes'} read`
    }
}
