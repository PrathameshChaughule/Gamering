import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

function UserDetailsLayout() {
    return (
        <>
            <div className='flex gap-8 w-[87vw] m-auto my-6'>
                <Sidebar />
                <Outlet />
            </div>
        </>
    )
}

export default UserDetailsLayout