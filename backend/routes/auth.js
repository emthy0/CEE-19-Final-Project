import { Router } from "express"
import { logoutHandler, authAppHandler, authAccessTokenHandler } from "../controllers/authController.js"
import { sessionCheckMiddleware } from "../middlewares/session.js"
const authRouter = new Router()

authRouter.get("/auth_app", authAppHandler)
authRouter.get("/access_token", authAccessTokenHandler)

authRouter.use(sessionCheckMiddleware)
authRouter.get("/logout", logoutHandler)

export default authRouter