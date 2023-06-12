import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
    const url = "http://172.24.16.18:8000/api/login/"
    const credentials = {
        email: "admin@gmail.com",
        password: "123"
    }
    const requestOptions = {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {'content-type': "application/json"}
    }
    
        const response = await fetch(url, requestOptions)
        const resObj = await response.json()
        // const token = resObj.token.access
        // const decoded = jwt.decode(token.body)
        const { access: accessToken, refresh: refreshToken  } = resObj 
        const decodedAccessToken = jwt.decode(accessToken)

        const user = decodedAccessToken.user
        user["data"] = {
            token: accessToken,
            refreshToken
        }
        user["name"] = user["firstname"]
    
        res.send({user})
}