import { useState, useEffect } from "react"
import axios from "axios"
import FromUpdate from "../components/FormUpdate"
const Todo = function () {
    const [job, setjob] = useState('')
    const [jobs, setjobs] = useState([])
    const [confirmLog, setconfirmLog] = useState(false)
    const handleAddJob = () => {
        axios.post('http://localhost:3001/todo/add', { name: job }, {
            headers: { 'Authorization': localStorage.getItem('token') }
        })
            .then(res => {
                console.log('res add todo', res)
                getList()
            })

    }
    const handleDeleteTodo = (job) => {
        let a = window.confirm('delete')
        if (a) {
            axios.delete(`http://localhost:3001/todo/${job._id}/deletetodo`)
                .then(res => {
                    console.log('res delete', res)
                    getList()
                })
        }
    }
    const handleUpdateTodo = (job) => {
        setconfirmLog(!confirmLog)
        // axios.put(`http://localhost:3001/todo/${job._id}/updatetodo`, {
        //     name: job
        // })
        //     .then(res => {
        //         console.log('res update', res)
        //         getList()
        //     })
    }
    function getList() {
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
                        jobs.map((job, index) => (
                            <li key={index} className="border-b px-2">
                                <div className="flex justify-between">
                                    <div className="mr-4 self-end">.</div>
                                    <div className="flex-grow self-end">{job.name}</div>
                                    <div><button onClick={() => handleUpdateTodo(job)} className="mx-8 p-1 bg-blue-300 m-1 rounded hover:bg-blue-600">Edit</button></div>
                                    <div><button onClick={() => handleDeleteTodo(job)} className="mx-8 p-1 bg-red-300 m-1 rounded hover:bg-red-600">Delete</button></div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
            {confirmLog && <FromUpdate></FromUpdate>}
        </>
    )
}
export default Todo