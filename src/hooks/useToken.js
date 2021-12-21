import { useState } from "react"
function useToken() {
    const [token, settoken] = useState(() => {
        return localStorage.getItem('token')
    })
    const saveToken = (userToken) => {
        localStorage.setItem('token', userToken)
        settoken(userToken)
    }
    return {
        token,
        settoken: saveToken
    }
}
export default useToken