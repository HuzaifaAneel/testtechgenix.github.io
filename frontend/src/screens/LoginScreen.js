import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import { Form, Button, Row, Col, FormLabel, FormGroup, FormControl } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import {login} from '../actions/userActions.js'
import FormContainer from '../components/FormContainer.js'
import { useNavigate} from 'react-router'

const LoginScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)

    const {loading, error, userInfo} = userLogin


    useEffect(() => {
        if(userInfo && userInfo.isLeadCreator){
            navigate('/leadcreatorhome')
            console.log(userInfo.isLeadCreator)
        }

        if(userInfo && userInfo.isLeadManager){
            navigate('/leadManager')
            
        }

    }, [ userInfo, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))

        
        // alert(`${FormData.email} and ${FormData.password}`)
        // //e.preventDefault()
    }
    


    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
               <FormGroup controlId='email'>
                   <FormLabel>Email Address</FormLabel>
                   <FormControl type='email' placeholder='Enter Email' value={email} 
                    onChange={(e) => setEmail(e.target.value)}>
                    </FormControl>
               </FormGroup>

               <FormGroup controlId='password'>
                   <FormLabel>Password</FormLabel>
                   <FormControl type='password' placeholder='Enter password' value={password} 
                    onChange={(e) => setPassword(e.target.value)}>
                    </FormControl>
               </FormGroup>

               <Button type='submit' variant='primary' className='mt-2'>
                   Sign In
               </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    New Customer? {' '}
                    <Link to={'/register'}>
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
