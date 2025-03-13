import Link from "next/link";

export default function Page() {
    return (
        <div>
            <Link href="/auth" className="m-10">Auth</Link>
            <Link href="/channels/123/232">Chat</Link>
        </div>
    )
}