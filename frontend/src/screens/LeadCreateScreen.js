import React, {useEffect, useState} from 'react'
import { Form, Button,FormLabel, FormGroup, FormControl } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import FormContainer from '../components/FormContainer.js'
import { useNavigate } from 'react-router'
import {leadcreate} from '../actions/leadActions.js'
import axios from 'axios'

const LeadCreateScreen = () => {

    const [user, setUser] = useState('')
    const [customerName, setCustomerName] = useState('')
    const [customerRepresentative, setCustomerRepresentative] = useState('')
    const [linkedin, setLinkedin] = useState('')
    const [contact, setContact] = useState('')
    const [leadAssignedTo, setLeadAssignedTo] = useState('')
    const [nextFollowup, setNextFollowUp] = useState('')
    const [followUpEmail, setFollowUpEmail] = useState('')
    const [followUpQutation, setFollowUpQutation] = useState('')
    const [followUpLetter, setFollowUpLetter] = useState('')
    const [remarks, setRemarks] = useState('')
    const [image, setImage] = useState('')
    
    const navigate = useNavigate();

    const dispatch = useDispatch()

    const createLead = useSelector(state => state.createLead)

    const {loading, error, lead} = createLead
    

    useEffect(() => {
        if(lead) {
            navigate('/leadcreatorhome')
        }
    }, [navigate, lead])

    const uploadFileHandler = async(e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)

        try{
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const {data} = await axios.post('/api/upload', formData, config)

            setImage(data)

        }
        catch(error){
            console.log('Not working')
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(leadcreate(user, customerName, customerRepresentative, linkedin, 
            contact, leadAssignedTo, nextFollowup, followUpEmail, followUpQutation, followUpLetter, remarks,image))
        navigate('/')
    }
    


    return (
        <FormContainer>
            <h1>Create Lead</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <h2 className='py-3'>User Details</h2>
                <FormGroup controlId='user'>
                   <FormLabel>User ID</FormLabel>
                   <FormControl type='text' placeholder='Enter User ID' value={user} 
                    onChange={(e) => setUser(e.target.value)}>
                    </FormControl>
               </FormGroup>
                <FormGroup controlId='customerName'>
                   <FormLabel>Customer Name</FormLabel>
                   <FormControl type='text' placeholder='Enter Customer Name' value={customerName} 
                    onChange={(e) => setCustomerName(e.target.value)}>
                    </FormControl>
               </FormGroup>
                <FormGroup controlId='customerRepresentative'>
                   <FormLabel>Customer Representative</FormLabel>
                   <FormControl type='text' placeholder='Enter Customer Representative' value={customerRepresentative} 
                    onChange={(e) => setCustomerRepresentative(e.target.value)}>
                    </FormControl>
               </FormGroup>
               <h2 className='py-3'>Contact</h2>
               <FormGroup controlId='linkedin'>
                   <FormLabel>Linkedin</FormLabel>
                   <FormControl type='text' placeholder='Enter Linkedin Url' value={linkedin} 
                    onChange={(e) => setLinkedin(e.target.value)}>
                    </FormControl>
               </FormGroup>
                <FormGroup controlId='customerRepresentative'>
                   <FormLabel>Customer Representative</FormLabel>
                   <FormControl type='text' placeholder='Enter Customer Representative' value={customerRepresentative} 
                    onChange={(e) => setCustomerRepresentative(e.target.value)}>
                    </FormControl>
               </FormGroup>
               <FormGroup controlId='contact'>
                   <FormLabel>Contact</FormLabel>
                   <FormControl type='number' placeholder='Enter Contact Number' value={contact} 
                    onChange={(e) => setContact(e.target.value)}>
                    </FormControl>
               </FormGroup>
               <h2 className='py-3'>Lead Assigned</h2>
               <FormGroup controlId='leadAssignedTo'>
                   <FormLabel>LeadAssigned</FormLabel>
                   <FormControl type='text' placeholder='Enter Lead Assigned To' value={leadAssignedTo} 
                    onChange={(e) => setLeadAssignedTo(e.target.value)}>
                    </FormControl>
               </FormGroup>
               <h2 className='py-3'>Follow Up</h2>
               <FormGroup controlId='nextFollowup'>
                   <FormLabel>Next Follow Up</FormLabel>
                   <FormControl type='date' value={nextFollowup} 
                    onChange={(e) => setNextFollowUp(e.target.value)}>
                    </FormControl>
               </FormGroup>
               <FormGroup controlId='followUpEmail'>
                   <FormLabel>Follow Up Email</FormLabel>
                   <FormControl type='email' placeholder='Enter Email' value={followUpEmail} 
                    onChange={(e) => setFollowUpEmail(e.target.value)}>
                    </FormControl>
               </FormGroup>
               <FormGroup controlId='followUpLetter'>
                   <FormLabel>FollowUpLetter</FormLabel>
                   <FormControl type='text' placeholder='Enter Letter' value={followUpLetter} 
                    onChange={(e) => setFollowUpLetter(e.target.value)}>
                    </FormControl>
               </FormGroup>
               <FormGroup controlId='followUpQuotation'>
                   <FormLabel>FollowUpQuotation</FormLabel>
                   <FormControl type='text' placeholder='Enter Quotation' value={followUpQutation} 
                    onChange={(e) => setFollowUpQutation(e.target.value)}>
                    </FormControl>
               </FormGroup>
               <h2 className='py-3'>Remarks</h2>
               <FormGroup controlId='remarks'>
                   <FormLabel>Remarks</FormLabel>
                   <FormControl type='text' placeholder='Enter Remarks' value={remarks} 
                    onChange={(e) => setRemarks(e.target.value)}>
                    </FormControl>
               </FormGroup>
               <h2 className='py-3'>Attachments</h2>
               <FormGroup controlId='image'>
                   <FormLabel>Attach Files</FormLabel>
                   <FormControl type='file' placeholder='Enter image url'
                    onChange={(e) => setImage(e.target.value)} onClick={uploadFileHandler}>
                    </FormControl>
               </FormGroup>

               
               <Button type='submit' variant='primary' className='mt-2'>
                   Submit
               </Button>
            </Form>

        </FormContainer>
    )
}

export default LeadCreateScreen
