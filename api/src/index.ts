import app from './app'
import config from './services/config'
import { connectDB } from './services/db'

app.listen(config.port, async () => {
    console.log(`Listening: http://localhost:${config.port}`)

    await connectDB()
})
