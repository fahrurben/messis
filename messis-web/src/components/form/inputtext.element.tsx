import cn from "../../helpers/cn.ts"
import type { FieldError, UseFormRegisterReturn } from "react-hook-form"

const InputText = ({
  placeholder,
  control,
  error,
  required = false,
  type = "text",
}: {
  placeholder: string
  control: UseFormRegisterReturn<string>
  error?: FieldError
  required?: boolean
  type?: string
}) => {
  return (
    <input
      type={type}
      className={cn("input", { "input-error": error }, "w-full")}
      placeholder={placeholder}
      required={required}
      {...control}
    />
  )
}

export default InputText
