import { getCsrfToken, getProviders, getSession, signIn } from "next-auth/react";
import { useState } from "react";
import styles from '../styles/Home.module.css';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from "next/router";


export default function SignIn({providers}) {
    // console.log(providers);
    const router = useRouter();
    const [error, setError] = useState();

    const handleSubmit = async() => {
        const username = "johndoe";
        const password = "hello";

        await signIn("credentials", {
            username,
            password,
            // redirect:false,
            callbackUrl: "http://localhost:8080/"
        })
    }
    return (
        <div className={styles.main}>
            <h1 className={styles.title}>
            NextAuth.js <a href="#">Demo!</a>
            </h1>

            <p className={styles.description}>
                <code className={styles.code}>Sign in</code>
            </p>
            {
                Object.values(providers).map(provider=>{
                    if (provider.name === "credentials") {
                        return;
                    }
                    return <button key={provider.id} onClick={()=>signIn(provider.id)} >Sign in with {provider.name}</button>
                })
            }
            
            <button onClick={handleSubmit}>clicl</button>
        <Formik
            initialValues={{name: '', email: '', password: ''}}
            validationSchema={Yup.object({
            name: Yup.string()
                    .max(30, 'Must be 30 characters or less')
                    .required('Please enter your name'),
            email: Yup.string()
                .max(30, 'Must be 30 characters or less')
                .email('Invalid email address')
                .required('Please enter your email'),
            password: Yup.string().required('Please enter your password'),
            
            })}
            onSubmit={async (values, { setSubmitting }) => {
                console.log("onsubmit...")
            const res = await signIn('credentials', {
                redirect: false,
                name: values.name,
                email: values.email,
                password: values.password,
                callbackUrl: `${window.location.origin}`,
            }) 
            // if (res.status === true) {
            //     router.push("/")
            // }
            // const resObj = await res.json()
            // console.log("from login page .......", {res})
            if (res?.error) {
                setError(res.error);
            } else {
                setError(null);
            }
            if (res.url) router.push(res.url);
            setSubmitting(false);
            }}
            
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div >
              <div>
                {/* <input
                  name="csrfToken"
                  type="hidden"
                  defaultValue={csrfToken}
                /> */}

                <div>
                  {error}
                </div>
                <div >
                  <label
                    htmlFor="name"
                  >
                    Nameasdsd
                    <Field
                      name="name"
                      aria-label="enter your name"
                      aria-required="true"
                      type="text"
                      className="w-full bg-gray-300 text-gray-900 mt-2 p-3"
                    />
                  </label>

                  <div className="text-red-600 text-sm">
                    <ErrorMessage name="name" />
                  </div>
                </div>
                <div >
                  <label
                    htmlFor="email"
                  >
                    Email
                    <Field
                      name="email"
                      aria-label="enter your email"
                      aria-required="true"
                      type="text"
                      className="w-full bg-gray-300 text-gray-900 mt-2 p-3"
                    />
                  </label>

                  <div className="text-red-600 text-sm">
                    <ErrorMessage name="email" />
                  </div>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="uppercase text-sm text-gray-600 font-bold"
                  >
                    password
                    <Field
                      name="password"
                      aria-label="enter your password"
                      aria-required="true"
                      type="password"
                      className="w-full bg-gray-300 text-gray-900 mt-2 p-3"
                    />
                  </label>

                  <div className="text-red-600 text-sm">
                    <ErrorMessage name="password" />
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="bg-green-400 text-gray-100 p-3 rounded-lg w-full"
                  >
                    {formik.isSubmitting ? 'Please wait...' : 'Sign In'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
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
        // csrfToken: await getCsrfToken(),
      },
    };
  }