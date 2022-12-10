import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiFillEye, AiFillDelete } from 'react-icons/ai'
import { MdModeEditOutline } from 'react-icons/md'
import { Input, Button, Box, IconButton } from '@chakra-ui/react'
import { IoMdAddCircle } from 'react-icons/io'
import { ContactService } from '../../../services/ContactService';
import { SpinerComp } from '../../../components'

export default function ContactList() {

    let [query, setQuery] = useState({
        text: ''
    })

    let [state, setState] = useState({
        loading: false,
        contacts: [],
        filteredContacts: [],
        errorMessage: ''
    })

    // func get Api All contacts
    async function getApi() {
        try {
            setState({ ...state, loading: true })
            let response = await ContactService.getAllContact();

            setState({
                ...state,
                loading: false,
                contacts: response.data,
                filteredContacts: response.data
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
        getApi()
    }, [])

    let clickDelete = async (contactId) => {
        try {

            let response = await ContactService.deleteContact(contactId)

            if (response) {
                setState({ ...state, loading: true })
                let response = await ContactService.getAllContact();

                setState({
                    ...state,
                    loading: false,
                    contacts: response.data,
                    filteredContacts: response.data
                })
            }

        } catch (error) {
            setState({
                ...state,
                loading: false,
                errorMessage: error.message
            })
        }
    }

    let searchContacts = (e) => {
        setQuery({
            ...query,
            text: e.target.value
        })

        let theContacts = state.contacts.filter(contact => {
            return contact.name.toLowerCase().includes(e.target.value.toLowerCase())
        })

        setState({
            ...state,
            filteredContacts: theContacts
        })

    }


    let { loading, contacts, filteredContacts, errorMessage } = state

    return (
        <>
            <div className='w-screen h-screen max-w-[1020px] mx-auto'>

                {
                    loading ? <SpinerComp /> : <section className='flex flex-col gap-3 pt-20 justify-center'>
                        <div className='flex items-center gap-2'>
                            <h2 className='text-xl font-bold'>Contact Manager</h2>

                            <div className=''>
                                <Link to={'/contacts/add'} className='bg-blue-500 w-[80px] h-[40px] flex justify-center items-center rounded-md cursor-pointer gap-1 text-white' >
                                    <IoMdAddCircle size={20}></IoMdAddCircle>   New</Link>
                            </div>
                        </div>
                        <p className='italic'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia possimus assumenda veritatis alias id dolorum nesciunt quisquam nemo? Dolores qui aperiam eaque saepe excepturi officia, sunt facere quibusdam dicta totam, cupiditate officiis distinctio voluptates sit adipisci veniam molestiae, reprehenderit aspernatur!</p>

                        <form className='flex gap-3 pt-2'>
                            <Input
                                width={400}
                                variant='filled'
                                name='text'
                                value={query.text}
                                onChange={searchContacts}
                                placeholder='Search here'>
                            </Input>

                            <Button colorScheme={'blue'} size='md'>search</Button>
                        </form>

                        <div className='flex flex-wrap gap-4 pt-5 mb-10'>

                            {
                                filteredContacts.length > 0 && filteredContacts.map((item) => {
                                    return (
                                        <Box key={item.id} maxW='lg' borderWidth='1px' borderRadius='lg' className='flex w-[500px] h-[200px] items-center gap-2 justify-center bg-gray-300' >
                                            <img src={item.photo} alt="name" className='w-[150px] h-[150px] rounded-full' />

                                            <div className='flex flex-col bg-white px-5 py-5'>
                                                <div className='flex'>
                                                    Name  : <span className='font-bold'>{item.name}</span>
                                                </div>
                                                <div className='flex'>
                                                    Mobile  : <span className='font-bold'>{item.mobile}</span>
                                                </div>
                                                <div className='flex'>
                                                    Email  : <span className='font-bold'> {item.email}</span>
                                                </div>
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <Link to={`/contacts/view/${item.id}`}>
                                                    <IconButton variant='outline'
                                                        bg='orange'
                                                        icon={<AiFillEye size={18}></AiFillEye>}
                                                    />
                                                </Link>
                                                <Link to={`/contacts/edit/${item.id}`}>
                                                    <IconButton variant='outline'
                                                        bg='blue'
                                                        icon={<MdModeEditOutline size={18}></MdModeEditOutline>}
                                                    />
                                                </Link>

                                                <IconButton
                                                    variant='outline'
                                                    bg='red'
                                                    icon={<AiFillDelete size={18}></AiFillDelete>}
                                                    onClick={() => {
                                                        clickDelete(item.id)
                                                    }}
                                                />

                                            </div>

                                        </Box>
                                    )
                                })
                            }


                        </div>

                    </section>
                }


            </div>



        </>
    );
}
