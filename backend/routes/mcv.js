import { Router } from "express"
import { getAllAssignmentsHandler, getProfileHandler } from "../controllers/mcvController.js"
import { sessionCheckMiddleware } from "../middlewares/session.js"
const mcvRouter = new Router()
mcvRouter.use(sessionCheckMiddleware)
mcvRouter.get("/profile", getProfileHandler)
mcvRouter.get("/assignments", getAllAssignmentsHandler)

export default mcvRouter

