import { Router } from "express"
import { getAllAssignmentsHandler, getProfileHandler, setAllAssignmentsHandler } from "../controllers/mcvController.js"
import { sessionCheckMiddleware } from "../middlewares/session.js"
const mcvRouter = new Router()
mcvRouter.use(sessionCheckMiddleware)
mcvRouter.get("/profile", getProfileHandler)
mcvRouter.get("/assignments", getAllAssignmentsHandler)
mcvRouter.put("/assignments", setAllAssignmentsHandler)

export default mcvRouter

