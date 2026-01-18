import cn from "../../helpers/cn.ts"
import type { FieldError, UseFormRegisterReturn } from "react-hook-form"

const TextArea = ({
  placeholder,
  control,
  error,
  required = false,
}: {
  placeholder: string
  control: UseFormRegisterReturn<string>
  error?: FieldError
  required?: boolean
  type?: string
}) => {
  return (
    <textarea
      className={cn("input textarea", { "input-error": error }, "w-full")}
      placeholder={placeholder}
      required={required}
      {...control}
    />
  )
}

export default TextArea
