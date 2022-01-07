import axios from "axios"
import { useState } from "react"
function FromUpdate({ handleOnOffEdit,getList, jobData }) {

    const [job, setjob] = useState(jobData.name)
    const [startDate, setstartDate] = useState(jobData.startDate)
    const [endDate, setendDate] = useState(jobData.endDate)
    function handleUpdateTodo(e, jobData) {
        e.preventDefault()
        console.log(jobData)
        axios.put(`http://localhost:3001/todo/${jobData._id}/updatetodo`, {
            name: job,
            startDate,
            endDate
        })
            .then(res => {
                console.log('res update', res)
                handleOnOffEdit()
                getList()
            })

    }
    return (
        <>
            <div className="bg-blue-300 w-80 h-80 p-2 z-10 fixed top top-1/3 right-1/2">
                <form onSubmit={e=> handleUpdateTodo(e, jobData)}>
                    <label>Job</label>
                    <input value={job} onChange={e => setjob(e.target.value)} className="border rounded w-full" placeholder="input todo" />
                    <label>Start Date</label>
                    <input value={new Date(startDate).toISOString().substring(0,10)}onChange={e => setstartDate(e.target.value)} type='date' className="border rounded w-full" placeholder="input start date" />
                    <label>End Date</label>
                    <input value={new Date(endDate).toISOString().substring(0,10)} onChange={e => setendDate(e.target.value)} type='date' className="border rounded w-full" placeholder="input end date" />
                    <div className="absolute bottom-2 right-2">
                        <button onClick={handleOnOffEdit} className="p-1 border rounded bg-red-300 mr-2">Cancel</button>
                        <button className="p-1 border rounded bg-red-300">Update</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default FromUpdate