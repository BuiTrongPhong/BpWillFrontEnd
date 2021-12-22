import { useState, useEffect } from "react"
import axios from "axios"
import FromUpdate from "../components/FormUpdate"
const Todo = function () {
    const [job, setjob] = useState('')
    const [jobData, setjobData] = useState('')
    const [jobs, setjobs] = useState([])
    const [confirmLog, setconfirmLog] = useState(false)
    const handleAddJob = () => {
        axios.post('http://localhost:3001/todo/add', { name: job }, {
            headers: { 'Authorization': localStorage.getItem('token') }
        })
            .then(res => {
                console.log('res add todo', res)
                // setjob('')   
                getList()
            })

    }
    const handleDeleteTodo = (jobData) => {
        let a = window.confirm('delete')
        if (a) {
            axios.delete(`http://localhost:3001/todo/${jobData._id}/deletetodo`)
                .then(res => {
                    console.log('res delete', res)
                    getList()
                    
                })
        }
    }
    const handleOnOffEdit = () => {
        setconfirmLog(!confirmLog)
    }
    const handleEditTodo = (jobData) => {
        handleOnOffEdit()
        // setjobData(jobData)
    }
    function handleUpdateTodo(jobEdit, jobData) {
        console.log('jobData', jobData)
        console.log('jobEdit', jobEdit)
        axios.put(`http://localhost:3001/todo/${jobData._id}/updatetodo`, {
            name: jobEdit
        })
            .then(res => {
                console.log('res update', res)
                handleOnOffEdit()
                getList()
            })

    }
    const getList = () => {
        axios.get('http://localhost:3001/todo/getall', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then(res => {
                setjobs(res.data.todo)
                console.log('getList')
            })

    }
    useEffect(() => {
        getList()
    }, [])
    
    return (
        <>
            <div className='mt-6'>
                <input value={job} onChange={(e) =>
                    setjob(e.target.value)
                } className='border mr-3 px-2'></input>
                <button onClick={handleAddJob} className='bg-blue-300  rounded px-1'>Add</button>
            </div>
            <div>
                <ul>
                    {
                        jobs.map((jobData, index) => (
                            <li key={index} className="border-b px-2">
                                <div className="flex justify-between">
                                    <div className="mr-4 self-end">.</div>
                                    <div className="flex-grow self-end">{jobData.name}</div>
                                    <div><button onClick={() => {
                                        setjobData(jobData)
                                        handleEditTodo(jobData)
                                        }} className="mx-8 p-1 bg-blue-300 m-1 rounded hover:bg-blue-600">Edit</button></div>
                                    <div><button onClick={() => handleDeleteTodo(jobData)} className="mx-8 p-1 bg-red-300 m-1 rounded hover:bg-red-600">Delete</button></div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
            
            {confirmLog && <FromUpdate handleUpdateTodo={handleUpdateTodo} handleOnOffEdit={handleOnOffEdit} jobData={jobData}></FromUpdate>}
            {confirmLog && <div onClick={handleOnOffEdit} className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 opacity-25"></div>}
        </>
    )
}
export default Todo