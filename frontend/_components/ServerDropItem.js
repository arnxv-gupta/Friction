export default function ServerDropItem({label, call}) {
  
  return  <li
    className="px-4 py-2 rounded mt-2 flex items-center bg-[#373737] hover:bg-[#2b2b2b] mx-3"
    onClick={call}
  >
    <span className="mr-2">{label}</span>
  </li>
}