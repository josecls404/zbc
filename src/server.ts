import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { applyCorsConfig } from './services/helper'
import professionalRoutes from './routes/professionals'
import customersRoutes from './routes/customers'

// sets up all config needed
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(applyCorsConfig)

// sets up all routes
app.use(professionalRoutes)
app.use(customersRoutes)

// sets main route
app.get('/', (req: Request, res: Response) => res.status(200).send('Zenklub API - Version 1.0'))

// app listening config
app.listen(8080, () => {
  console.log('Server is running. You can access by http://localhost:8080 :)')
})

export default app
