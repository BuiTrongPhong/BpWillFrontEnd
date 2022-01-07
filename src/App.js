import React, { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import Todo from './pages/Todo';
import useToken from './hooks/useToken';
import Profile from './pages/Profile';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function App() {
    const [profile, setprofile] = useState()

    useEffect(() => {
        axios.get('http://localhost:3001/user/profile', {
            headers: { 'Authorization': localStorage.getItem('token') }
        })
            .then(res => setprofile(res.data))
    }, [])

    const { token, settoken } = useToken()
    function PrivateRoute({ children }) {
        return token ? children : <Login settoken={settoken}></Login>
    }
    let navigate = useNavigate()
    function handleLogout() {
        settoken('')
        localStorage.removeItem('token')
        navigate('/')
    }
    return (
        <div className=' bg-yellow-50'>
            {/* Header */}
            <div className='bg-green-200 fixed top-0 left-0 right-0'>
                <div className='container mx-auto flex justify-between items-center p-4 '>
                    <div className='flex items-center'>
                        <Link to='/'>
                            <h1 className='mx-4 text-3xl text-blue-400'>Bpwill</h1>
                        </Link>
                        {/* danh muc */}
                        <div className=''>
                            <Link className='' to='/todo'>
                                <h2 className='text-blue-600'>Todo</h2>
                            </Link>
                        </div>

                    </div>
                    {/* login logout */}
                    {!token ?
                        (<div className='flex'>
                            <Link to='/register-user'>
                                <button className='mx-2 text-xs bg-blue-400 rounded p-2'>Sign up</button>
                            </Link>
                            <Link to='/login-user'>
                                <button className='mx-2 text-xs bg-green-500 rounded p-2'>Sign in</button>
                            </Link>
                        </div>)
                        :
                        (<div className='flex'>
                            <Link className='hover:text-green-900 text-green-500 flex items-center' to='/profile'>
                                <div className='w-4 h-4'>
                                    <svg aria-hidden="true" focusable="false"
                                        data-prefix="fas" data-icon="user"
                                        className="svg-inline--fa fa-user fa-w-14"
                                        role="img" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512">
                                        <path fill="currentColor"
                                            d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z">
                                        </path>
                                    </svg>
                                </div>
                                <div>
                                    <button className='p-2 '>
                                        {profile?.userName}
                                    </button>
                                </div>
                            </Link>
                            <button onClick={handleLogout} className='mx-2 text-xs bg-green-500 rounded p-2'>Log out</button>
                        </div>)
                    }
                </div>
            </div>
            {/* body */}
            <div>
                <div className='container mx-auto p-8 mb-32 mt-20 bg-white'>
                    <Routes>
                        <Route path='/register-user' element={<Register></Register>}></Route>
                        <Route path='/login-user' element={<Login settoken={settoken}></Login>}></Route>
                        <Route path='/' element={<HomePage></HomePage>}></Route>
                        <Route path='/profile' element={<Profile></Profile>}></Route>
                        <Route
                            path="/todo"
                            element={
                                <PrivateRoute>
                                    <Todo />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </div>

            </div>
            {/* footer */}
            <div className='bg-gray-600 fixed bottom-0 left-0 right-0 h-32'>

            </div>
        </div>
    )
}

export default App;
