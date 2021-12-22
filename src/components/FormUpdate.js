// import axios from "axios"
import { useState } from "react"
function FromUpdate({ handleOnOffEdit, handleUpdateTodo, jobData }) {
    const [jobEdit, setjobEdit] = useState(jobData.name)
    return (
        <div className="z-10 fixed top-44 left-1/3 border rounded w-80 h-40 mx-auto bg-gray-50 p-4">
            <div className="flex justify-end">
                <button onClick={handleOnOffEdit} className="px-2">x</button>
            </div>
            <div className="">
                <div className="flex">
                    <label className="px-1">Name</label>
                    <textarea value={jobEdit} onChange={(e) => setjobEdit(e.target.value)} className="mx-1 px-1 border"></textarea>
                </div>
                <div className="absolute bottom-4 right-4">
                    <button onClick={() => {
                        handleUpdateTodo(jobEdit, jobData)
                    }
                    }
                        className="mx-1 px-1 bg-blue-500 rounded place-items-end">Update</button>
                </div>
            </div>
        </div>
    )
}
export default FromUpdate