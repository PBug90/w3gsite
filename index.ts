import app from './app/Server'

const port = 8080

app.listen(port, () => {
  console.log(`App is running on ${port}`)
})
