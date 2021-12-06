import React, {useEffect, useState} from 'react'
import { Table, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'

const LeadManagerScreen = () => {

    const[leads, setLeads] = useState([])

    
    useEffect(() => {
        const fetchleads = async () => {
            const {data} = await axios.get('/api/users/leads')
            setLeads(data)
        }

        fetchleads()
    },[])
    
    const deleteHandler = (id) => {
        console.log(id)
    }

    return (
        <>
            <h1>Leads</h1>
                <Table id="table_id" striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Customer Name</th>
                            <th>Customer Representative</th>
                            <th>Marked?</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>

                        {leads.map(lead => (
                            <tr key={lead._id}>
                                <td>{lead._id}</td>                
                                <td>{lead.customerName}</td>                              
                                <td>{lead.customerRepresentative}</td>                              
                                <td>
                                    {lead.isMarked ? (<i className='fas fa-check' style={{ color: 'green' }}></i>)
                                     :
                                     (<i className='fas fa-times' style={{ color: 'red' }}></i>)
                                    }
                                </td>     
                                <td>
                                    <Link to={`/user/${lead._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </Link>
                                    <Button variant='danger' className='btn-sm' onClick={()=> deleteHandler(lead._id)}>
                                    <i className='fas fa-trash'></i>
                                    </Button>
                                </td>           
                            </tr>

                            
                        ))}
                    </tbody>
                </Table>
        </>
    )
}

export default LeadManagerScreen
