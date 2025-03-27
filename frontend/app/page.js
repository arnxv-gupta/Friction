import Link from "next/link";

export default function Page() {
    return (
        <div className="bg-[##EAECEF] text-black h-full p-4">
            <nav className="flex items-baseline justify-between">
                <h2 className="text-2xl font-medium">Friction</h2>
                <Link href={"/auth"} className="bg-[#D8D6DB] font-medium text-[#1F2228] px-3 py-1 rounded-sm hover:underline cursor-pointer">Sign In</Link>       
            </nav>

            <header className="h-[80vh] flex items-center">
                <div>
                    <h4 className="text-4xl">
                        Experience <span className="underline decoration-pink-600 decoration-wavy">friction-less</span><br/>
                        communication
                    </h4>
                    <small className="text-[#c5c5c5]">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </small>
                </div>
            </header>
        </div>
    )
}