import { useState, useEffect } from "react"
import axios from "axios"
import FromUpdate from "../components/FormUpdate"
import FormAdd from "../components/FormAdd"

const Todo = function () {
    const [jobData, setjobData] = useState('')
    const [jobs, setjobs] = useState([])
    const [isEdit, setisEdit] = useState(false)
    const [isAdd, setisAdd] = useState(false)

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
        setisEdit(!isEdit)
    }
    const handleOnOffAdd = () => {
        setisAdd(!isAdd)
    }
    const handleEditTodo = (jobData) => {
        handleOnOffEdit()
        // setjobData(jobData)
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
            <div className='my-6 float-right'>
                <button onClick={handleOnOffAdd} className='bg-blue-300  rounded px-1'>Add</button>
            </div>
            <div>
                <table className="table-auto border-collapse border w-full">
                    <thead>
                        <tr className="">
                            <th className="border px-2 w-52">Job</th>
                            <th className="border px-2">Start date</th>
                            <th className="border px-2">End date</th>
                            <th className="border px-2">Edit</th>
                            <th className="border px-2">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            jobs.map((jobData, index) => (
                                <tr key={index} >
                                    <td className="border px-2">{jobData.name}</td>
                                    <td className="border px-2">{new Date(jobData.startDate).toISOString().substring(0, 10)}</td>
                                    <td className="border px-2">{new Date(jobData.endDate).toISOString().substring(0, 10)}</td>
                                    <td className="border px-2 text-center"><button onClick={() => {
                                        setjobData(jobData)
                                        handleEditTodo(jobData)
                                    }} className="p-1 bg-blue-300 m-1 rounded hover:bg-blue-600">Edit</button></td>
                                    <td className="border px-2 text-center"><button onClick={() => handleDeleteTodo(jobData)} className="p-1 bg-red-300 m-1 rounded hover:bg-red-600">Delete</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {isEdit && <FromUpdate getList={getList} handleOnOffEdit={handleOnOffEdit} jobData={jobData}></FromUpdate>}
            {isEdit && <div onClick={handleOnOffEdit} className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 opacity-25"></div>}
            {isAdd && <FormAdd getList={getList} handleOnOffAdd={handleOnOffAdd}></FormAdd>}
            {isAdd && <div onClick={handleOnOffAdd} className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 opacity-25"></div>}

        </>
    )
}
export default Todo