import "dotenv/config"

import { startBackend } from "./server.js"
// const { startBackend: startServer } = require("./server")

// process.on("uncaughtException", (err) => {
//   console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...")
//   console.log(err.name, err.message)
//   console.log(err.stack)
//   process.exit(1)
// })
const server = startBackend()

// process.on("unhandledRejection", (err) => {
//   console.log("UNHANDLED REJECTION! 💥 Shutting down...")
//   console.log(err.name, err.message)
//   server.close(() => {
//     process.exit(1)
//   })
// })
