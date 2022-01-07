import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Login = function ({settoken}) {
    let navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    function handleLogin() {
        axios.post('http://localhost:3001/user/login-user', {
            userName: username,
            password: password
        })
        .then(res => {
            const token = res.data.token
            settoken(token)
            alert('login successfully')
            if(window.location.href.includes('login-user')){
                navigate('/')
            }
        })
        .catch(function (error) {
            // handle error
            alert('username or password not correct')
            console.log('error:', error);
        })

    }
    return (
        <>
            <div className='w-1/3 mx-auto mt-20'>
                <div className='border p-4 rounded'>
                    <h1 className='text-center'>Sign in</h1>
                    <div className='text-center my-4' action=''>
                        <input onChange={(e) => setUsername(e.target.value)} placeholder='input username' className='border w-3/4 my-3 px-2'></input>
                        <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='input password' className='border w-3/4 my-3 px-2'></input>
                        <br />
                        <button onClick={handleLogin} className='bg-green-700 p-2 rounded text-white text-md'>Sign in</button>
                        <div>
                            <Link to='/register-user'>Create new account</Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Login