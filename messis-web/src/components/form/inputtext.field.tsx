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
    <div>
      <label id={name}>
        {label}
        {required && <span className={"text-red-500"}>*</span>}
      </label>
      {children}
      {error && <span className="text-error">{error.message}</span>}
    </div>
  )
}

export default InputTextField
