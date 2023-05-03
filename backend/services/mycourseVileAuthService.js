import axois from "axios"
const redirect_uri = `http://${process.env.backendIPAddress}/courseville/access_token`
const authorization_url = `https://www.mycourseville.com/api/oauth/authorize?response_type=code&client_id=${process.env.client_id}&redirect_uri=${redirect_uri}`
const access_token_url = "https://www.mycourseville.com/api/oauth/access_token"

export const getAccessToken = (code) => {
    
    const postData = {
        grant_type: "authorization_code",
        code: code,
        client_id: process.env.client_id,
        client_secret: process.env.client_secret,
        redirect_uri: redirect_uri,
    }
    return axois.post(access_token_url, postData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": postData.length,
        },
      }).then((tokenRes) => {
        if (tokenRes.data)  return tokenRes.data
        throw new Error("Failed to fetch access token")
      })
}
