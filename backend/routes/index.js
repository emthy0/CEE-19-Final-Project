import { default as authRouter } from "./auth.js"
import { default as mcvRouter } from "./mcv.js"
import { authAccessTokenHandler } from "../controllers/authController.js"

export const routeRegister = (app) => {
    app.use("/auth", authRouter)
    app.use("/mcv", mcvRouter)
    app.get("/courseville/access_token", authAccessTokenHandler)
}
