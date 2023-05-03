import { Router } from "express"
import { default as authRouter } from "./auth.js"
import { default as mcvRouter } from "./mcv.js"
import { authAccessTokenHandler } from "../controllers/authController.js"

export const routeRegister = (app) => {
    const router = new Router()
    router.use("/auth", authRouter)
    router.use("/mcv", mcvRouter)
    app.use("/api/v1", router)
    app.get("/courseville/access_token", authAccessTokenHandler)
}
