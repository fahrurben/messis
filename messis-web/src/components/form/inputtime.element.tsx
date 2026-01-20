import cn from "../../helpers/cn.ts"
import type { FieldError, UseFormRegisterReturn } from "react-hook-form"
import { InputMask } from "@react-input/mask"

const InputTime = ({
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
    <InputMask
      type={type}
      mask="__:__"
      replacement={{ _: /\d/ }}
      className={cn("input", { "input-error": error }, "w-full")}
      placeholder={placeholder}
      required={required}
      {...control}
    />
  )
}

export default InputTime
