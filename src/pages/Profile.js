import { useEffect, useState } from "react"
import axios from "axios"
function Profile() {
    const [profile, setprofile] = useState()
    useEffect(() => {
        axios.get('http://localhost:3001/user/profile', {
            headers: { 'Authorization': localStorage.getItem('token') }
        })
            .then(res => setprofile(res.data))
    }, [])
    return (
        <>  
            <div>Your Profile
                <div>Name: {profile?.userName}</div>
                <div>Email: {profile?.email}</div>
                <div>Role: {profile?.role}</div>
            </div>

        </>
    )
}
export default Profile