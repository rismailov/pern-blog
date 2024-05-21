import {
    DeleteObjectCommand,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3'
import crypto from 'crypto'

import config from '../../services/config'
import { format } from 'date-fns'

type TFile = Express.Multer.File

const s3 = new S3Client({
    credentials: {
        accessKeyId: config.AWS.ACCESS_KEY,
        secretAccessKey: config.AWS.SECRET_KEY,
    },
    region: config.AWS.S3_REGION,
})

export default class ArticleService {
    // upload image to s3 and return filename (Key)
    async uploadImageToS3(file: TFile): Promise<string | boolean> {
        const filename =
            crypto.randomBytes(7).toString('hex') + '-' + file.originalname

        const putCommand = new PutObjectCommand({
            Bucket: config.AWS.S3_BUCKET_NAME,
            Key: filename,
            Body: file.buffer,
            ContentType: file.mimetype,
        })

        // save the file in s3 bucket
        const resp = await s3.send(putCommand)

        if (resp.$metadata.httpStatusCode === 200) {
            return filename
        }

        return false
    }

    async deleteImageFromS3(filename: string): Promise<void> {
        try {
            const deleteCommand = new DeleteObjectCommand({
                Bucket: config.AWS.S3_BUCKET_NAME,
                Key: filename,
            })

            const resp = await s3.send(deleteCommand)

            console.log(resp.$metadata.httpStatusCode)
        } catch (error) {
            console.log(error)
        }
    }

    getImageUrl(filename: string): string {
        // if filename includes https - this image comes from seeded data, in that case just use the full url
        return filename.includes('https')
            ? filename
            : `https://${config.AWS.S3_BUCKET_NAME}.s3.${config.AWS.S3_REGION}.amazonaws.com/${filename}`
    }

    getMinutesToRead(content: string): string {
        const wordsPerMinute = 250
        const wordsCount = content.split(' ').length
        const minutesToRead = Math.ceil(wordsCount / wordsPerMinute)

        return `${minutesToRead} ${minutesToRead === 1 ? 'min' : 'mins'} read`
    }

    getFormattedDate(date: Date): string {
        return format(date, 'MMM d, yyyy')
    }
}
