import React, { useState, useEffect } from 'react';
import { Input, Select, Button, Stack } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom';
import { ContactService } from '../../../services/ContactService';
import { SpinerComp } from '../../spinner';

export default function AddContact() {

    let navigate = useNavigate()

    let [state, setState] = useState({
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

    let updateInput = (e) => {
        setState({
            ...state,
            contact: {
                ...state.contact,
                [e.target.name]: e.target.value
            }
        })
    }

    // get data groups
    async function getGroups() {
        try {
            setState({ ...state, loading: true })
            let response = await ContactService.getGroups()

            setState({
                ...state,
                loading: false,
                groups: response.data
            })
        } catch (error) {
            setState({
                ...state,
                loading: false,
            })
        }
    }

    useEffect(() => {
        getGroups()
    }, [])

    // submit input form data
    let submitForm = async (e) => {
        e.preventDefault()

        let name = e.target.name.value;
        let photo = e.target.photo.value;
        let mobile = e.target.mobile.value;
        let email = e.target.email.value;
        let company = e.target.company.value;
        let title = e.target.title.value;
        let groupId = e.target.groupId.value;

        if (!name || !photo || !mobile || !email || !company || !title || !groupId) {
            return alert('you must input data')
        }

        try {
            let response = await ContactService.createContact(state.contact)

            if (response) {
                navigate('/contacts/list', { replace: true })
            }

        } catch (error) {
            setState({
                ...state,
                errorMessage: error.message
            })
            navigate('/contacts/list', { replace: false })
        }


    }

    let { loading, contact, groups, errorMessage } = state

    return (
        <>
            {
                loading ? <SpinerComp /> : (
                    <div className='w-screen h-screen max-w-[1020px] mx-auto'>
                        <section className='pt-20'>
                            <h1 className='font-bold text-xl'>Create Contact</h1>
                            <p className='italic pt-4'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia possimus assumenda veritatis alias id dolorum nesciunt quisquam nemo? Dolores qui aperiam eaque saepe excepturi officia, sunt facere quibusdam dicta totam, cupiditate officiis distinctio voluptates sit adipisci veniam molestiae, reprehenderit aspernatur!</p>

                            <form onSubmit={submitForm} autoComplete='off' className='flex flex-col w-[500px] h-full'>
                                <div className='flex flex-col gap-3 pt-5'>
                                    <Stack>
                                        <Input
                                            onChange={updateInput}
                                            value={contact.name}
                                            name='name' variant={'outline'}
                                            placeholder='Name' width={400} />
                                        <Input
                                            name='photo'
                                            onChange={updateInput}
                                            value={contact.photo} variant={'outline'} type='url'
                                            placeholder='Photo Url'
                                            width={400} />
                                        <Input
                                            name='mobile'
                                            onChange={updateInput}
                                            value={contact.mobile} variant={'outline'} type='number'
                                            placeholder='Mobile phone'
                                            width={400} />
                                        <Input
                                            name='email'
                                            value={contact.email}
                                            onChange={updateInput}
                                            variant={'outline'} type='email' placeholder='Email' width={400} />
                                        <Input
                                            name='company'
                                            onChange={updateInput}
                                            value={contact.company} variant={'outline'} placeholder='Company'
                                            width={400} />
                                        <Input
                                            name='title'
                                            value={contact.title}
                                            onChange={updateInput}
                                            variant={'outline'} placeholder='Title'
                                            width={400} />
                                    </Stack>



                                    <Select
                                        name='groupId'
                                        value={contact.groupId}
                                        onChange={updateInput}
                                        width={400}>
                                        <option >Select group</option>

                                        {
                                            groups.length > 0 && groups.map((group) => {
                                                return (
                                                    <option
                                                        key={group.id}
                                                        value={group.id}
                                                    >{group.name}</option>
                                                )
                                            })
                                        }
                                    </Select>

                                    <div className='flex gap-3 pt-3'>
                                        <Button type='submit' w={20} bg={'green.400'} color='white' >Create</Button>
                                        <Link to={'/contacts/list'} className='h-[40px] w-[100px] bg-black text-white flex justify-center items-center rounded-md hover:bg-slate-800 duration-300' >Cancel</Link>
                                    </div>
                                </div>
                            </form>

                        </section>
                    </div>
                )
            }

        </>
    );
}
