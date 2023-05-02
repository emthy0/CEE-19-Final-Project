import { default as authRouter } from "./auth.js"
import { default as mcvRouter } from "./mcv.js"

export const routeRegister = (app) => {
    app.use("/auth", authRouter)
    app.use("/mcv", mcvRouter)
}
