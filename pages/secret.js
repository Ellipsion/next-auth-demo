import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from '../styles/Home.module.css'

const Secret = () => {
    const {data: session} = useSession();
    const [state, setState] = useState();

    useEffect(()=>{
        const fetchData = async() => {
            const res = await fetch("/api/secret");
            const json = await res.json();

            if (json.content) {
                setState(json.content);
            }

        }

        fetchData();
    });

    if (session) {
        return (
            <main className={styles.main}>
            <h1 className={styles.title}>
              NextAuth.js <a href="/">Demo!</a>
            </h1>
            <p className={styles.description}>
              <code className={styles.code}>Secret content</code>
            </p>
                <div className={styles.grid}>
                  <a href="https://www.nextjs.org" className={styles.card}>
                    {/* <h2>Sign In &rarr;</h2> */}
                    <p>Find in-depth information about Next.js features and API.</p>
                  </a>
                  <a href="/" className={styles.card}>
                    <h2>Home</h2>
                  </a>
                </div>
                <p className={styles.title}>
                  {state}
                </p>
            </main>
          )
      }
      return (
        <main className={styles.main}>
        <h1 className={styles.title}>
          NextAuth.js <a href="/">Demo!</a>
        </h1>

        <p className={styles.description}>
          <code className={styles.code}>Secret content</code>
        </p>
            <p className={styles.title}>
              You are not Logged In...
            </p>
            <div className={styles.grid}>
              <a href="#" onClick={signIn} className={styles.card}>
                <h2>Sign In &rarr;</h2>
                {/* <p>Find in-depth information about Next.js features and API.</p> */}
              </a>
            </div>
        </main>
      )
};

export default Secret;
