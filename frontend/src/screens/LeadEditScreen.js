import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import { Form, Button, FormLabel, FormGroup, FormControl, FormCheck } from 'react-bootstrap'
import FormContainer from '../components/FormContainer.js'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'

const LeadEditScreen = () => {

    const { id } = useParams()

    const leadid = id

    const [customerName, setCustomerName] = useState('')
    const [customerRepresentative, setCustomerRepresentative] = useState('')
    const [isMarked, setIsMarked] = useState(false)
    

    const navigate = useNavigate();

    


    useEffect(() => {

        const fetchLeads = async () => {
            const {data} = await axios.get(`/api/users/${leadid}`)

            console.log(data)
            setCustomerName(data.customerName)
            setCustomerRepresentative(data.customerRepresentative)
        }

        fetchLeads()
       
    }, [leadid])

   
    

    const submitHandler = (e) => {
        e.preventDefault()

        const updateleads = async () => {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const {data} = await axios.put(`/api/users/${leadid}`,{customerName,customerRepresentative,isMarked}, config)

            console.log(data)
            console.log(customerName)
            if(isMarked){
                await axios.post(`/api/users/sendemail`)
                console.log('email sent')
            }
        }

        updateleads()
        navigate('/leadManager')
      
       
    }
    


    return (

        <>
        <Link to='/leadManager' className='btn btn-light my-3'>
            Go Back        
        </Link>
      
        <FormContainer>
            <h1>Edit Lead</h1>
            <Form onSubmit={submitHandler}>

                <FormGroup controlId='customerName'>
                   <FormLabel>Customer Name</FormLabel>
                   <FormControl type='text'  value={customerName} 
                    onChange={(e) => setCustomerName(e.target.value)}>
                    </FormControl>
               </FormGroup>

               <FormGroup controlId='customerRepresentative'>
                   <FormLabel>Customer Representative</FormLabel>
                   <FormControl type='text'  value={customerRepresentative} 
                    onChange={(e) => setCustomerRepresentative(e.target.value)}>
                    </FormControl>
               </FormGroup>

               <FormGroup controlId='ismarked'>
                   <FormCheck type='checkbox' label='Is Marked' checked={isMarked} 
                    onChange={(e) => setIsMarked(e.target.checked)}>
                    </FormCheck>
               </FormGroup>


               <Button type='submit' variant='primary' className='mt-2'>
                   Update
               </Button>
            </Form>
        </FormContainer>

        </>
    )
}

export default LeadEditScreen
