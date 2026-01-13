import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loading from "../components/Loading"
import { RiShoppingCartLine } from 'react-icons/ri';
import { IoWallet } from 'react-icons/io5';
import { toast } from 'react-toastify';

function MyAccount() {
  const userData = JSON.parse(localStorage.getItem("auth"));
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)
  const [formOpen, setFormOpen] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`http://localhost:3000/users/${userData.userId}`)
      setUser(res.data)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (userData?.userId) {
      fetchData()
    }
  }, [userData?.userId])

  if (loading) return <div><Loading /></div>

  const formHandle = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const addressHandle = (e) => {
    const { name, value } = e.target

    setUser(prev => ({
      ...prev,
      address: [
        {
          ...prev.address?.[0],
          [name]: value
        }
      ]
    }))
  }

  const formSubmit = async () => {
    try {
      await axios.patch(`http://localhost:3000/users/${userData.userId}`, user)
      toast.success("Profile Successfully Updated")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='w-[67vw] relative flex flex-col gap-3'>
      <div>
        <h1 className="text-3xl font-semibold text-white/90">My Account</h1>
      </div>
      <div className='flex justify-between w-full items-start'>
        <div className='w-[73%]'>
          <div>
            <p className='text-xl text-gray-300 font-semibold'>Account Details</p>
            <div className='border p-3 rounded my-2 bg-[#181A1E] border-[#2f354494]'>
              <div className='flex items-start justify-between'>
                <div className='flex gap-6 p-3 px-6'>
                  <div className="relative cursor-pointer border-4 border-blue-600 text-white/90 text-center h-25 w-25 flex items-center justify-center rounded-full text-[70px] font-semibold">
                    <span>{user?.firstName?.at(0)}</span>
                    <div className="absolute bottom-1 -right-0.5 h-5 w-5 border-4 border-[#181A1E] rounded-full bg-green-500"></div>
                  </div>
                  <div className='mt-2'>
                    <p className='text-3xl font-semibold'>{user?.firstName} {user?.lastName}</p>
                    <p className='text-xl text-gray-400'>{user?.email}</p>
                  </div>
                </div>
                <div onClick={() => setFormOpen(true)} className='rounded w-fit mt-3 mr-3 p-1 px-5 text-xl bg-sky-500 font-semibold cursor-pointer hover:bg-sky-600'>
                  <span>Edit Profile</span>
                </div>
              </div>
              <hr className='border-[#3e4657] my-2' />
              <div className='flex justify-between'>
                <div className='px-8 flex gap-10'>
                  <div className='text-lg text-gray-300 flex flex-col gap-3.5 py-4'>
                    <p>Full Name :</p>
                    <p>Email :</p>
                    <p>Member Since :</p>
                  </div>
                  <div className='text-lg text-white flex flex-col gap-3.5 py-4'>
                    <p>{user?.firstName} {user?.lastName}</p>
                    <p>{user?.email}</p>
                    <p>{new Date(user?.createdAt).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true, }).toUpperCase()}</p>
                  </div>
                </div>
                <div className='px-8 flex gap-10'>
                  <div className='text-lg text-gray-300 flex flex-col gap-3.5 py-4'>
                    <p>Active Status :</p>
                    <p>Last Login :</p>
                    <p>Last Order :</p>
                  </div>
                  <div className='text-lg text-white flex flex-col gap-3.5 py-4'>
                    <p>{user?.status} User</p>
                    <p>{new Date(user?.lastLogin).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true, }).toUpperCase()}</p>
                    <p>{new Date(user?.lastOrder).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true, }).toUpperCase()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className='text-xl mt-5 text-gray-300 font-semibold'>Billing Information</p>
            <div className='border p-3 rounded my-2 bg-[#181A1E] border-[#2f354494]'>
              <div className='flex justify-between'>
                <div className='px-8 flex gap-10'>
                  <div className='text-lg text-gray-300 flex flex-col gap-3.5 py-4'>
                    <p>Address :</p>
                    <p>Phone Number :</p>
                    <p>City :</p>
                  </div>
                  <div className='text-lg text-white flex flex-col gap-3.5 py-4'>
                    {user?.address?.[0].address === "" ? <p className='underline text-gray-500 cursor-pointer hover:text-gray-400'>Add Address</p> : <p>{user?.address?.[0]?.address}</p>}
                    {user?.mobileNumber === "" ? <p className='underline text-gray-500 cursor-pointer hover:text-gray-400'>Add Mobile Number</p> : <p>{user?.mobileNumber}</p>}
                    {user?.address?.[0].city === "" ? <p className='underline text-gray-500 cursor-pointer hover:text-gray-400'>Add City</p> : <p>{user?.address?.[0]?.city}</p>}
                  </div>
                </div>
                <div className='px-8 flex gap-10'>
                  <div className='text-lg text-gray-300 flex flex-col gap-3.5 py-4'>
                    <p>Country :</p>
                    <p>State/Province :</p>
                    <p>Zip or Postal Code :</p>
                  </div>
                  <div className='text-lg text-white flex flex-col gap-3.5 py-4'>
                    {user?.address?.[0].country === "" ? <p className='underline text-gray-500 cursor-pointer hover:text-gray-400'>Add Country</p> : <p>{user?.address?.[0]?.country}</p>}
                    {user?.address?.[0].state ? <p>{user?.address?.[0]?.state}</p> : <p className='underline text-gray-500 cursor-pointer hover:text-gray-400'>Add State</p>}
                    {user?.address?.[0].zipCode ? <p>{user?.address?.[0]?.zipCode}</p> : <p className='underline text-gray-500 cursor-pointer hover:text-gray-400'>Add Zip Code</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-[25%]'>
          <p className='text-xl text-gray-300 font-semibold'>My Orders</p>
          <div className='border border-[#2f354494] px-6 my-2 rounded bg-[#181A1E] flex items-center gap-5 p-4'>
            <RiShoppingCartLine className='text-5xl' />
            <div>
              <p className='text-xl text-gray-300/80'>Total Orders</p>
              <p className='text-4xl ml-1 font-semibold'>{user?.totalOrders}</p>
            </div>
          </div>
          <div className='border border-[#2f354494] px-6 my-4 rounded bg-[#181A1E] flex items-center gap-5 p-4'>
            <IoWallet className='text-5xl text-white/90' />
            <div>
              <p className='text-xl text-gray-300/80'>Total Spends</p>
              <p className='text-4xl ml-1 font-semibold'>₹{user?.totalSpend?.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
      {formOpen &&
        <div class="absolute top-2 -left-1 w-210 mx-auto p-6 bg-gradient-to-br from-[#0b0f14] to-[#10151c] rounded-xl border border-white/10 shadow-lg">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-white">Edit Profile</h2>
            <button onClick={() => { formSubmit(), setFormOpen(false) }} class="px-4 py-2 text-sm cursor-pointer rounded-md bg-sky-500 hover:bg-sky-600 font-semibold text-white transition">
              Save Changes
            </button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <div>
              <label class="text-sm text-gray-400">First Name</label>
              <input
                type="text"
                placeholder="Enter first name"
                value={user?.firstName}
                name='firstName'
                onChange={(e) => formHandle(e)}
                class="mt-1 w-full bg-[#0f141b] border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="text-sm text-gray-400">Last Name</label>
              <input
                type="text"
                placeholder="Enter last name"
                value={user?.lastName}
                name='lastName'
                onChange={(e) => formHandle(e)}
                class="mt-1 w-full bg-[#0f141b] border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="text-sm text-gray-400">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={user?.email}
                name='email'
                onChange={(e) => formHandle(e)}
                class="mt-1 w-full bg-[#0f141b] border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p class="text-xs text-gray-500 mt-1">Email change requires verification</p>
            </div>
            <div>
              <label class="text-sm text-gray-400">Phone Number</label>
              <input
                type="text"
                placeholder="+91 XXXXX XXXXX"
                value={user?.mobileNumber}
                name='mobileNumber'
                onChange={(e) => formHandle(e)}
                class="mt-1 w-full bg-[#0f141b] border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <h3 class="text-lg font-medium text-white mb-4">Billing Information</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="md:col-span-2">
              <label class="text-sm text-gray-400">Address</label>
              <input
                type="text"
                placeholder="Street address"
                value={user?.address?.[0].address}
                name='address'
                onChange={(e) => addressHandle(e)}
                class="mt-1 w-full bg-[#0f141b] border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="text-sm text-gray-400">City</label>
              <input
                type="text"
                placeholder="City"
                value={user?.address?.[0].city}
                name='city'
                onChange={(e) => addressHandle(e)}
                class="mt-1 w-full bg-[#0f141b] border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="text-sm text-gray-400">State / Province</label>
              <input
                type="text"
                placeholder="State"
                value={user?.address?.[0].state}
                name='state'
                onChange={(e) => addressHandle(e)}
                class="mt-1 w-full bg-[#0f141b] border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="text-sm text-gray-400">Zip / Postal Code</label>
              <input
                type="text"
                placeholder="Postal Code"
                value={user?.address?.[0].zipCode}
                name='zipCode'
                onChange={(e) => addressHandle(e)}
                class="mt-1 w-full bg-[#0f141b] border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="text-sm text-gray-400">Country</label>
              <select
                class="mt-1 w-full bg-[#0f141b] border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={user?.address?.[0].country}
                name='country'
                onChange={(e) => addressHandle(e)}
              >
                <option>India</option>
                <option>USA</option>
                <option>UK</option>
              </select>
            </div>
          </div>
        </div>}
    </div>
  )
}

export default MyAccount