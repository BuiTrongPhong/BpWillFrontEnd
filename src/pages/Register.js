import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
function Register() {
    const [usernameReg, setUsernameReg] = useState('')
    const [emailReg, setEmailReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')
    function register() {
        axios.post('http://localhost:3001/user/register-user', {
            userName: usernameReg,
            email: emailReg,
            password: passwordReg
        })
            .then(res => console.log(res))

    }
    return (
        <div className='w-1/3 mx-auto mt-20'>
            <div className='border p-4 rounded'>
                <h1 className='text-center'>Sign up</h1>
                <div className='text-center my-4' action=''>
                    <input onChange={(e) => setUsernameReg(e.target.value)} placeholder='input username' className='border w-3/4 my-3 px-2'></input>
                    <input onChange={(e) => setEmailReg(e.target.value)} placeholder='input email' className='border w-3/4 my-3 px-2'></input>
                    <input onChange={(e) => setPasswordReg(e.target.value)} type='password' placeholder='input password' className='border w-3/4 my-3 px-2'></input>
                    <br />
                    <button onClick={register} className='bg-green-700 p-2 rounded text-white text-md'>Sign up</button>
                    <div>
                        <span>You have account </span>
                        <Link className='text-blue-600' to='/login-user/'>Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register