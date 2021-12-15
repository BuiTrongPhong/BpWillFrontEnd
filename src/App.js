import React from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import Todo from './pages/Todo';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function App() {
    const [token, settoken] = useState()
    // if(!token){
    //     let navigate = useNavigate()
    //     navigate('/login-user')
    // }
    return (
        <div className=' bg-yellow-50'>
            {/* Header */}
            <div className='bg-green-200'>
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
                    <div className='flex'>
                        <Link to='/register-user'>
                            <button className='mx-2 text-xs bg-blue-400 rounded p-2'>Sign up</button>
                        </Link>
                        <Link to='/login-user'>
                            <button className='mx-2 text-xs bg-green-500 rounded p-2'>Sign in</button>
                        </Link>
                    </div>
                </div>
            </div>
            {/* body */}
            <div>
                <div className='container mx-auto p-8 bg-white'>
                    <Routes>
                        <Route path='/register-user' element={<Register></Register>}></Route>
                        <Route path='/login-user' element={<Login></Login>}></Route>
                        <Route path='/' element={<HomePage></HomePage>}></Route>
                        <Route path='/todo' element={<Todo></Todo>}></Route>
                    </Routes>
                </div>
            </div>
        </div>

    )
}

export default App;
