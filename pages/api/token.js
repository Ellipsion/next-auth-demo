import { getToken } from "next-auth/jwt"
import { getSession } from "next-auth/react"

const secret = process.env.NEXTAUTH_SECRET

export default async function handler(req, res) {
  // if using `NEXTAUTH_SECRET` env variable, we detect it, and you won't actually need to `secret`
  // const token = await getToken({ req })
  if (req.method === 'POST') {
    console.log('post')
  } if (req.method === 'GET') {
    console.log('get')
  }
  const token = await getToken({ req, secret })
  const session = await getSession({req})

  const response = JSON.stringify({session, token}, null, 4)
  res.send(response)
}