import jwt from 'jsonwebtoken'
const authLoginUrl = `${process.env.BACKEND_API_URL}/accounts/login/`

const createUser = function(resObj) {
    const { access: accessToken, refresh: refreshToken  } = resObj 
    const decodedAccessToken = jwt.decode(accessToken)

    const user = decodedAccessToken.user
    user["data"] = {
        token: accessToken,
        refreshToken
    }
    user["name"] = user["firstname"]

    return user
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        console.log(authLoginUrl)
        const credentials = req.body
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {'content-type': "application/json"}
        }
        console.log('/api/jwt-session/', requestOptions)
        const response = await fetch(authLoginUrl, requestOptions)
        const resObj = await response.json()
        // console.log('/api/jwt-session/', resObj)
        // const token = resObj.token.access
        // const decoded = jwt.decode(token.body)
        console.log('/api/jwt-session/ response', resObj)
        const status = response.status
        if (status == 200) {
            const user = createUser(resObj)
            res.send({user})
        } else {
            res.status(status).send({
                error: resObj.detail
            })
        }
        
    } else {
        res.send('GET: method not allowed')
    }
    
    
}