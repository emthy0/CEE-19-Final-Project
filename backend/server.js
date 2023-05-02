import app from "./app.js"
const PORT = 3000
export const startBackend = () => {
  const server = app.listen(PORT, () => {})
  return server
}
