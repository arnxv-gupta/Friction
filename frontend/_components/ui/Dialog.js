export default function Dialog({children}) {
    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-[#1d1f24] outline outline-2 outline-gray-800 px-5 py-3 w-96 rounded">
            {children}
            </div>
        </div>
    )
}