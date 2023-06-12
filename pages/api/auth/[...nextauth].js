import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import Auth0Provider from "next-auth/providers/auth0";


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Auth0Provider({
        clientId: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        issuer: process.env.AUTH0_ISSUER
    }),
    // Credentials provider
    CredentialsProvider({
        id: 'credentials',
        name: 'credentials',
        // credentials attribute to generate a html form
        
        // authorize function || authorization and validation logic 
        async authorize(credentials, req){
            const requestOptions = {
                method: "POST",
                body: JSON.stringify(credentials),
                headers: {'content-type': "application/json"}
            }
            // console.log(requestOptions)
            const res = await fetch("http:localhost:8080/api/authentication/jwt-session/", requestOptions)
            const resObj = await res.json()
            const {error, user} = resObj
            // const decoded = jwt.decode(token)
            
            if (error) {
                return Promise.reject(new Error(error))
            }
            // console.log(res)
            // console.log(resObj)
            // console.log("nextauth", resObj)
            if (res.ok && user) {
                return user
            } 
            //     return Promise.reject(new Error("signin failed"))
            // }
            

            return null
        },
    }),
  ],
  //custom pages
  pages: {
    signIn: "/newsignin"
  },

  callbacks: {
    async signIn(user, token) {
      console.log("CALLBACK [signIn]", {user})
        return true
      },
    async jwt({ token, user, account }) {
        
      if (account && user) {
        return {
          ...token,
          token: user.data.token,
          // refreshToken: user.data.refreshToken,
        };
      }

      return token;
    },

    async session({ session, token }) {
        session.token = token.accessToken;
        return session;
      },
    
  },

  debug: true,
}

export default NextAuth(authOptions)