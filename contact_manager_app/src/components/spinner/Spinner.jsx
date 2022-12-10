import React from 'react';
import { Spinner } from '@chakra-ui/react'

export default function SpinerComp() {
    return (
        <>
            <div className='flex justify-center items-center pt-40'>
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
            </div>
        </>
    );
}
