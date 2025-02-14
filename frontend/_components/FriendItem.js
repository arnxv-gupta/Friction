import Link from "next/link";

export default function FriendItem({name}) {
    // add pfp
    return (
        <li  className="px-3 py-2 hover:bg-[#35373C] block rounded-md">
            <Link href={`/channels/@me/${name}`}>
            {name}
            </Link>
        </li>
    )
}