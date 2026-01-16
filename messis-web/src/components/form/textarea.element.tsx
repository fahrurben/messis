import cn from "../../helpers/cn.ts"
import type { FieldError, FieldValues, UseFormRegister } from "react-hook-form"

const TextArea = ({
  name,
  placeholder,
  register,
  error,
  required = false,
}: {
  name: string
  placeholder: string
  register: UseFormRegister<FieldValues>
  error?: FieldError
  required?: boolean
  type?: string
}) => {
  return (
    <textarea
      className={cn("input textarea", { "input-error": error }, "w-full")}
      placeholder={placeholder}
      {...register}
      required={required}
      {...register(name)}
    />
  )
}

export default TextArea
