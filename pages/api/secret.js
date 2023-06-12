// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { authOptions } from './auth/[...nextauth]'
import { unstable_getServerSession } from "next-auth/next"

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions)
  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }
  return res.status(200).json({
    content: 'This is the protected content. You can access this content because you are signed in.'
  });
}
