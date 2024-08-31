import express from 'express'
import { AppDataSource } from './app-data-source.js'
import bodyParser from 'body-parser'
import { router } from './router.js'
import { cors } from './middlewares/cors.js'
import { contentType } from './middlewares/content-type.js'
const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router())
app.use(cors)
app.use(contentType)

AppDataSource.initialize().then(async () => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})
