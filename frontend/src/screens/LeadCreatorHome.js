import React from 'react'
import {Link} from 'react-router-dom'
import {  Button, } from 'react-bootstrap'
import FormContainer from '../components/FormContainer.js'


const LoginScreen = () => {

    return (
        <FormContainer>
            <h1>Welcome</h1>
                <Button type='submit' as={Link} to='/createlead' variant='primary' className='mt-2'>
                    Create a Lead
               </Button>

         </FormContainer>
    )
}

export default LoginScreen
