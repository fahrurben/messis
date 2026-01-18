import cn from "../../helpers/cn.ts"
import type {
  FieldError,
  FieldValues,
  UseFormRegister,
  UseFormRegisterReturn,
} from "react-hook-form"

const CheckBox = ({
  label,
  control,
  error,
}: {
  label: string
  control: UseFormRegisterReturn<string>
  error?: FieldError
}) => {
  return (
    <label className={cn("label", { "input-error": error }, "w-full")}>
      <input type="checkbox" className="checkbox" {...control} />
      {label}
    </label>
  )
}

export default CheckBox
