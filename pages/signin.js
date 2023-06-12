import { getCsrfToken, getProviders, getSession, signIn } from "next-auth/react";
import styles from '../styles/Home.module.css'
import React from "react";

export default function SignIn({providers, csrfToken}) {
    // console.log(providers);
    return (
        <div className={styles.main}>
            <h1 className={styles.title}>
            NextAuth.js <a href="#">Demo!</a>
            </h1>

            <p className={styles.description}>
                <code className={styles.code}>Sign in</code>
            </p>
            <a href="/" className={styles.card}>
                <p>Home</p>
            </a>
            <form action="/api/auth/signin/credentials" method="post">
                {/* <div className={styles.grid}> */}
                        <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
                    {/* <div className={styles.card}> */}
                        <label htmlFor="username">Username</label>
                        <br />
                        <input name="username" type="email" id="username" placeholder="user@example.com" />
                    {/* </div> */}
                    
                    {/* <div className={styles.card}> */}
                        <label htmlFor="password">Password</label>
                        <br />
                        <input name="password" type="password" id="password" />
                    {/* </div> */}
    
                    <button  type="submit">Sign In</button>
                    
                {/* </div> */}
            </form>

        </div>
    )
}

export async function getServerSideProps(context) {
    const { req, res } = context;
    const session = await getSession({ req });
  
    if (session) {
      return {
        redirect: { destination: "/" },
      };
    }
  
    return {
      props: {
        providers: await getProviders(),
        csrfToken: await getCsrfToken(),
      },
    };
  }