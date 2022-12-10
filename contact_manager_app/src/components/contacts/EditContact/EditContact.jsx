import React, { useState, useEffect } from 'react';
import { Input, Select, Button } from '@chakra-ui/react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ContactService } from '../../../services/ContactService';
import { SpinerComp } from '../../spinner';

export default function EditContact() {

    let { contactId } = useParams()

    const [state, setState] = useState({
        loading: false,
        contact: {
            name: '',
            photo: '',
            mobile: "",
            email: '',
            company: '',
            title: '',
            groupId: ''
        },
        groups: [],
        errorMessage: ''
    })

    async function getGroups() {
        try {
            setState({ ...state, loading: true })
            let response = await ContactService.getContact(contactId)
            let groupRespons = await ContactService.getGroups()

            setState({
                ...state,
                loading: false,
                contact: response.data,
                groups: groupRespons.data,
            })

        } catch (error) {
            setState({ ...state, loading: false, errorMessage: error.message })
        }
    }

    useEffect(() => {
        getGroups()
    }, [contactId])


    let updateInput = (e) => {
        setState({
            ...state,
            contact: {
                ...state.contact,
                [e.target.name]: e.target.value
            }
        })
    }

    let navigate = useNavigate()

    let submitForm = async (e) => {
        e.preventDefault()


        let name = e.target.name.value;
        let photo = e.target.photo.value;
        let mobile = e.target.mobile.value;
        let email = e.target.email.value;
        let company = e.target.company.value;
        let title = e.target.title.value;
        let groupId = e.target.groupId.value;

        if (!name && !photo && !mobile && !email && !company && !title && !groupId) {
            return alert('you must input data')
        }

        try {
            let response = await ContactService.updateContact(state.contact, contactId)


            if (response) {
                navigate('/', { replace: true })
            }

        } catch (error) {
            setState({
                ...state,
                errorMessage: error.message
            })
            navigate(`/contacts/edit/${contactId}`, { replace: false })
        }
    }



    let { loading, contact, groups, errorMessage } = state

    return (
        <>
            {
                loading ? <SpinerComp /> : (
                    <div className='w-screen h-screen max-w-[1020px] mx-auto mb-10'>
                        <section className='pt-20'>
                            <h1 className='font-bold text-xl text-blue-400 mt-5'>Edit Contact</h1>
                            <p className='italic pt-4'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia possimus assumenda veritatis alias id dolorum nesciunt quisquam nemo? Dolores qui aperiam eaque saepe excepturi officia, sunt facere quibusdam dicta totam, cupiditate officiis distinctio voluptates sit adipisci veniam molestiae, reprehenderit aspernatur!</p>

                            <form onSubmit={submitForm} autoComplete='off' className='flex flex-col w-[500px] h-full'>
                                <div className='flex justify-between items-center'>
                                    <div className='flex flex-col gap-3 pt-5'>
                                        <Input value={contact.name} onChange={updateInput} name='name' type='name' variant={'outline'} placeholder='Name' width={400} />

                                        <Input value={contact.photo} name='photo' onChange={updateInput} variant={'outline'} type='url' placeholder='Photo Url' width={400} />

                                        <Input value={contact.mobile} name='mobile' onChange={updateInput} variant={'outline'} type='number' placeholder='Mobile phone' width={400} />

                                        <Input value={contact.email} name='email' onChange={updateInput} variant={'outline'} type='email' placeholder='Email' width={400} />

                                        <Input value={contact.company} name='company' onChange={updateInput} variant={'outline'} placeholder='Company' width={400} />

                                        <Input value={contact.title} name='title' onChange={updateInput} variant={'outline'} placeholder='Title' width={400} />


                                        <Select placeholder='Select Group' width={400} onChange={updateInput} value={contact.groupId} name='groupId'  >
                                            {
                                                groups.map((group) => {
                                                    return (
                                                        <option key={group.id}
                                                            value={group.id}
                                                        >
                                                            {group.name}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </Select>


                                        <div className='flex gap-3 pt-3'>
                                            <Button type='submit' colorScheme='blue' width={20} >Update</Button>
                                            <Link to={'/contacts/list'} className='h-[40px] w-[100px] bg-black text-white flex justify-center items-center rounded-md hover:bg-slate-800 duration-300' >Cancel</Link>
                                        </div>
                                    </div>

                                    <img src={contact.photo} alt="contact" className='w-full h-[250px] rounded-full ml-10 mb-5' />

                                </div>

                            </form>

                        </section>
                    </div>
                )
            }
        </>
    );
}
