import { useState } from "react"
import axios from "axios"
function FormAdd({getList,handleOnOffAdd}) {
    const [job, setjob] = useState('')
    const [startDate, setstartDate] = useState('')
    const [endDate, setendDate] = useState('')
    function handleAddJob(e) {
        e.preventDefault()
        axios.post('http://localhost:3001/todo/add',
            {
                name: job,
                startDate: startDate,
                endDate: endDate
            },
            {
                headers: { 'Authorization': localStorage.getItem('token') }
            })
            .then(res => {
                console.log('res add todo', res)
                // setjob('')   
                getList()
            })
    }
    return (
        <>
            <div className="bg-blue-300 w-80 h-80 p-2 z-10 fixed top top-1/3 right-1/2">
                <form onSubmit={handleAddJob}>
                    <label>Job</label>
                    <input onChange={e => setjob(e.target.value)} className="border rounded w-full" placeholder="input todo" />
                    <label>Start Date</label>
                    <input onChange={e => setstartDate(e.target.value)} type='date' className="border rounded w-full" placeholder="input start date" />
                    <label>End Date</label>
                    <input onChange={e => setendDate(e.target.value)} type='date' className="border rounded w-full" placeholder="input end date" />
                    <div className="absolute bottom-2 right-2">
                        <button onClick={handleOnOffAdd} className="p-1 border rounded bg-red-300 mr-2">Cancel</button>
                        <button className="p-1 border rounded bg-red-300">Add</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default FormAdd