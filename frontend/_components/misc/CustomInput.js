export default function CustomInput({label, type, id, name, required}) {
    return (
    <>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        required={required}
        autoFocus={true}
        className="my-3 w-full px-4 py-3 bg-[#1E1F22] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </>
    )
}