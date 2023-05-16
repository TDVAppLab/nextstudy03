import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import MainSatView from '@/components/MainSatView/MainSatView'
import agent from '@/app/agent'
import { Container } from 'react-bootstrap'
import { Form, Formik } from 'formik'
import { getCsrfToken, useSession } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    /*

  
  const { data: session } = useSession();

  if(session) {
      getCsrfToken().then((token) => {
        console.log(" : ");
          console.log(token);
      })

  }

*/
  
    async function UpdateActiveSatData() {

/*
        const token = await getCsrfToken();
        console.log(" : ");
        console.log(token);

        fetch('/api/getactivesatdatabatch',
            {
                method: 'POST',
                headers: {
                'Authorization': 'Bearer '+token,
                'Content-Type': 'application/json',
                }
            }
            ).then(async (response)=>{
            console.log('response : ', response);
            console.log('json : ', await response.json());
            }).then((data)=>{
            console.log('data : ', data);
            }).catch((error) => {
            console.error('error : ', error);
        });
*/


        await agent.batchlogs.getactivesatapi();
    }


    return (
            <Container>
                
                <Formik
                    enableReinitialize 
                    initialValues={{}}
                    onSubmit={values => UpdateActiveSatData()}>
                    {({ handleSubmit, isValid, isSubmitting }) => (
                        <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>
                            <button disabled={!isValid || isSubmitting } type = 'submit' className='btn btn-primary'>
                                {isSubmitting ? "Processing" : "Run Batch"}
                            </button>
                        </Form>
                    )}
                </Formik>

            </Container>
    )
}
