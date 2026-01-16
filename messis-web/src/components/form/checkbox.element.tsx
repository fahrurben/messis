import cn from "../../helpers/cn.ts"
import type { FieldError, FieldValues, UseFormRegister } from "react-hook-form"

const CheckBox = ({
  name,
  label,
  register,
  error,
  required = false,
  type = "text",
}: {
  name: string
  label: string
  register: UseFormRegister<FieldValues>
  error?: FieldError
  required?: boolean
  type?: string
}) => {
  return (
    <label className={cn("label", { "input-error": error }, "w-full")}>
      <input type="checkbox" className="checkbox" {...register(name)} />
      {label}
    </label>
  )
}

export default CheckBox
