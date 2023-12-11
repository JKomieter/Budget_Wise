import LeftContent from '@/layouts/LeftContent'
import RightContent from '@/layouts/RightContent'
import React from 'react'

function Form() {
    return (
        <div className='h-full w-full md:grid grid-cols-2'>
            <LeftContent />
            <RightContent />
        </div>
    )
}

export default Form