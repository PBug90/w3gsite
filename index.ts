import dotenv from 'dotenv'
import app from './app/Server'
import Database from './app/Database'
dotenv.config()

const port = process.env.PORT || 8080

app.listen(port, async () => {
  console.log(`App is running on ${port}`)
  try {
    await Database.connect()
    console.log('DB connected')
  } catch (ex) {
    console.log(ex)
  }
})
