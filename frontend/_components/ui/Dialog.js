export default function Dialog({children}) {
    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 ">
            <div className="bg-[#383838] px-5 py-3 min-w-96 rounded">
            {children}
            </div>
        </div>
    )
}