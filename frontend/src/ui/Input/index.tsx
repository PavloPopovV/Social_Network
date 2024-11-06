import { ChangeEvent} from "react"

type Props = {
  type: "text" | "password" | "email" | "number" | "email"
  name: string
  placeholder: string
  register?: any
  value?: string
  error?: string
  onChange?: (event:ChangeEvent<HTMLInputElement>) => void
}

const Input = ({
  name,
  placeholder,
  type,
  register,
  error,
  value,
  onChange,
}: Props) => {
  return (
    <label htmlFor={name} className="relative block">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        {...register}
        onChange={onChange}
        className="w-full py-3 pl-4 pr-7 rounded-xl bg-gray-500 text-white outline-none "
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </label>
  )
}

export default Input
