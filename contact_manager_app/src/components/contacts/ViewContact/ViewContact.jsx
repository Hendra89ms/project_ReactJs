import React, { useState, useEffect } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ContactService } from '../../../services/ContactService';
import { SpinerComp } from '../../spinner';

export default function ViewContact() {

    let { contactId } = useParams()

    let [state, setState] = useState({
        loading: false,
        contacts: {},
        errorMessage: '',
        group: {}
    })

    // get single Contact
    async function getContact() {
        try {
            setState({ ...state, loading: true })
            let response = await ContactService.getContact(contactId)

            let groupResponse = await ContactService.getGroup(response.data)

            setState({
                ...state,
                loading: false,
                contacts: response.data,
                group: groupResponse.data
            })
        } catch (error) {
            setState({
                ...state,
                loading: false,
                errorMessage: error.message
            })
        }
    }

    useEffect(() => {
        getContact()
    }, [])

    let { loading, contacts, errorMessage, group } = state

    return (
        <>
            <div className='w-screen h-screen max-w-[1020px] mx-auto'>
                {
                    loading ? <SpinerComp /> :
                        (
                            <section className='pt-20 '>
                                <h2 className='text-2xl font-bold text-orange-300'>View Contact</h2>
                                <p className='italic pt-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia possimus assumenda veritatis alias id dolorum nesciunt quisquam nemo? Dolores qui aperiam eaque saepe excepturi officia, sunt facere quibusdam dicta totam, cupiditate officiis distinctio voluptates sit adipisci veniam molestiae, reprehenderit aspernatur!</p>

                                <Box width='800px' borderWidth='1px' borderRadius='lg' className='flex mt-6 items-center gap-5 bg-gray-300 p-5'>
                                    <img src={contacts.photo} className='w-[250px] h-[250px] rounded-full ' />


                                    <div className='flex flex-col bg-white w-full gap-2 p-2 '>
                                        <div className='flex'>
                                            Name : <span className='font-bold'>{contacts.name}</span>
                                        </div>
                                        <div className='flex'>
                                            Mobile : <span className='font-bold'>{contacts.mobile}</span>
                                        </div>
                                        <div className='flex'>
                                            Email : <span className='font-bold'>{contacts.email}</span>
                                        </div>
                                        <div className='flex'>
                                            Company : <span className='font-bold'>{contacts.company}</span>
                                        </div>
                                        <div className='flex'>
                                            Title : <span className='font-bold'>{contacts.title}</span>
                                        </div>
                                        <div className='flex'>
                                            Group : <span className='font-bold'>{group.name}</span>
                                        </div>
                                    </div>
                                </Box>


                                <Link to={'/contacts/list'}>
                                    <Button bg='orange.300' textColor='white' className='mt-5'>Back</Button>
                                </Link>

                            </section>
                        )
                }
            </div>
        </>
    );
}
