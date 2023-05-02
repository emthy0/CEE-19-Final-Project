import session from "express-session"
const sessionOptions = {
  secret: process.env.JWT_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    // setting this false for http connections
    secure: false,
    // sameSite: "none",
  },
}

export const sessionRegister = (app) => {
  app.use(session(sessionOptions))
}

export const sessionCheckMiddleware =  (req, res, next) => {
  if (req.session.token) {
    next()
  } else {
    res.status(401).send("Unauthorized")
  } 
}
