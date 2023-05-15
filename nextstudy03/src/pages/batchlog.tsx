import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import MainSatView from '@/components/MainSatView/MainSatView'
import agent from '@/app/agent'
import { Container } from 'react-bootstrap'
import { Form, Formik } from 'formik'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    
    async function UpdateActiveSatData() {
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
