import React from 'react'
import { FaAngleLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function CustomerDetails() {
    const nav = useNavigate()
    return (
        <div className='min-h-182 p-5 px-7 m-3 bg-[#FFFFFF] dark:bg-[#030318] rounded-lg w-[98%] flex flex-col gap-5'>
            <p className='text-xl text-gray-500 dark:text-white/60 flex gap-2'><span onClick={() => nav("/adminCustomer")} className='cursor-pointer flex items-center gap-1 text-lg'><FaAngleLeft className='text-xl' /> Customer  / </span><span className='dark:text-white/85 text-black font-semibold text-lg'>123</span></p>

        </div>
    )
}

export default CustomerDetails