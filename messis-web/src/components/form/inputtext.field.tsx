import type { ReactNode } from "react"
import type { FieldError } from "react-hook-form"

const InputTextField = ({
  label,
  name,
  required,
  error,
  children,
}: {
  label: string
  name: string
  required: boolean
  error?: FieldError
  children: ReactNode
}) => {
  return (
    <div className="w-full">
      <label id={name} className="w-full">
        {label}
        {required && <span className={"text-red-500"}>*</span>}
      </label>
      <div className="w-full mt-2">
        {children}
      </div>
      {error && <span className="text-error">{error.message}</span>}
    </div>
  )
}

export default InputTextField
