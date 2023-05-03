import cors from "cors"
const corsOptions = {
  origin: true,
  credentials: true,
}

export const corsRegister = (app) => {
  app.use(cors(corsOptions))
}
