import express from 'express'
import router from './routes/images'

const app = express()
const port = 3000

// app.use(express.static('assets'))

app.use('/', router)

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})
