function FromUpdate() {
    return (
        <div className="border rounded w-80 h-40 mx-auto bg-gray-50 p-4">
            <div className="flex items-start">
                <label className="px-1">Name</label>
                <textarea className="mx-1 px-1 border"></textarea>
                <button className="mx-1 px-1 bg-blue-500 rounded">Update</button>
            </div>
        </div>
    )
}
export default FromUpdate