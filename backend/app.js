import { corsRegister } from "./middlewares/cors.js"
import { sessionRegister } from "./middlewares/session.js"
import express from "express"
import { routeRegister } from "./routes/index.js"
import bodyParser from "body-parser"
const app = express()
app.use(express.static("static"))
app.use(bodyParser.json({limit: '100mb'}))
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }))
corsRegister(app)
sessionRegister(app)
routeRegister(app)

export default app
