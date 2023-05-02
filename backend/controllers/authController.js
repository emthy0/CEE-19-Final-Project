/// <reference path="authController.d.ts" />
import querystring from "querystring"
import url from "url"
import { getAccessToken } from "../services/mycourseVileAuthService.js"
const redirect_uri = `http://${process.env.backendIPAddress}/courseville/access_token`
const authorization_url = `https://www.mycourseville.com/api/oauth/authorize?response_type=code&client_id=${process.env.client_id}&redirect_uri=${redirect_uri}`
const access_token_url = "https://www.mycourseville.com/api/oauth/access_token"

export const authAppHandler = (_, res) => {
  res.redirect(authorization_url)
}


export const authAccessTokenHandler = async (req, res) => {
  const parsedUrl = url.parse(req.url)
  const parsedQuery = querystring.parse(parsedUrl.query)
  console.log(parsedQuery)
  if (parsedQuery.error) {
    res.writeHead(400, { "Content-Type": "text/plain" })
    res.end(`Authorization error: ${parsedQuery.error_description}`)
    return
  }

  if (parsedQuery.code) {
    getAccessToken(parsedQuery.code).then((token) => {
      if (token) {
        req.session.token = token
        res.writeHead(302, {
          Location: `http://${process.env.frontendIPAddress}/index.html`,
        })
        res.end()
      } else  {
        res.status(400).send("Failed to fetch access token")
      }
    }).catch((err) => {
      console.error(err)
      res.status(400).send("Failed to fetch access token")
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
