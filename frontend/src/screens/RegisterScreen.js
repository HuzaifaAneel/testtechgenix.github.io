import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import { Form, Button, Row, Col, FormLabel, FormGroup, FormControl } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import {register} from '../actions/userActions.js'
import FormContainer from '../components/FormContainer.js'
import { useNavigate} from 'react-router'

const RegisterScreen = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const navigate = useNavigate();

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)

    const {loading, error, userInfo} = userRegister


    useEffect(() => {
        if(userInfo) {
            navigate('/')
            console.log(userInfo)
        }
    }, [navigate, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Passwords donot match')
        }
        else{
            dispatch(register(name , email, password))
        }
    }
    


    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <FormGroup controlId='name'>
                   <FormLabel>Name</FormLabel>
                   <FormControl type='text' placeholder='Enter Name' value={name} 
                    onChange={(e) => setName(e.target.value)}>
                    </FormControl>
               </FormGroup>

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
               <FormGroup controlId='confirmpassword'>
                   <FormLabel>Confirm Password</FormLabel>
                   <FormControl type='password' placeholder='Confirm password' value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)}>
                    </FormControl>
               </FormGroup>

               <Button type='submit' variant='primary' className='mt-2'>
                   Register
               </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Have an Account? {' '}
                    <Link to={'/login'}>
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
