/// <reference path="authController.d.ts" />
import querystring from "querystring"
import axois from "axios"
const redirect_uri = `http://${process.env.backendIPAddress}/auth/access_token`
const authorization_url = `https://www.mycourseville.com/api/oauth/authorize?response_type=code&client_id=${process.env.client_id}&redirect_uri=${redirect_uri}`
const access_token_url = "https://www.mycourseville.com/api/oauth/access_token"

export const authAppHandler = (_, res) => {
  res.redirect(authorization_url)
}


export const authAccessTokenHandler = async (req, res) => {
  const parsedUrl = url.parse(req.url)
  const parsedQuery = querystring.parse(parsedUrl.query)

  if (parsedQuery.error) {
    res.writeHead(400, { "Content-Type": "text/plain" })
    res.end(`Authorization error: ${parsedQuery.error_description}`)
    return
  }

  if (parsedQuery.code) {
    getAccessToken(parsedQuery.code).then((tokenRes) => {
      const token = tokenRes.data
      if (token) {
        req.session.token = token
        res.writeHead(302, {
          Location: `http://${process.env.frontendIPAddress}/home.html`,
        })
        res.end()
      }
    }).catch((err) => {
      console.error(err)
      res.sen
    })
  } else {
    res.writeHead(302, { Location: authorization_url })
    res.end()
  }
}

export const logoutHandler = (req, res) => {
  req.session.destroy()
  res.redirect(`http://${process.env.frontendIPAddress}/login.html`)
  res.end()
}
