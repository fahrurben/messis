import cn from "../../helpers/cn.ts";

const InputText = ({
  name,
  placeholder,
  register,
  error,
  required = false,
  type = 'text',
}: {
  name: string
  placeholder: string
  register: any
  error?: any
  required?: boolean
  type?: string
}) => {
  return (
    <input type={type} className={cn("input", {"input-error": error})} placeholder={placeholder} {...register} required={required} {...register(name)} />
  )
}

export default InputText