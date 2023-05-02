const redirect_uri = `http://${process.env.backendIPAddress}/courseville/access_token`
const authorization_url = `https://www.mycourseville.com/api/oauth/authorize?response_type=code&client_id=${process.env.client_id}&redirect_uri=${redirect_uri}`
const access_token_url = "https://www.mycourseville.com/api/oauth/access_token"

export const authAppHandler = (_, res) => {
  res.redirect(authorization_url)
}
