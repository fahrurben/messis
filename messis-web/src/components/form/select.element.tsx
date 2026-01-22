import type { FieldError, UseFormRegisterReturn } from "react-hook-form"
import type { SelectOptionType } from "../../commons/types.ts"

const Select = ({
  placeholder,
  control,
  options,
  error,
}: {
  placeholder: string
  control: UseFormRegisterReturn<string>
  options: SelectOptionType[]
  error?: FieldError
}) => {
  return (
    <div className="w-full">
      <select className="select" {...control}>
        <option value="">{placeholder}</option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-error">{error.message}</span>}
    </div>
  )
}

export default Select
