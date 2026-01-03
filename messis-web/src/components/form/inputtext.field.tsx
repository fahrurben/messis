import type {ReactNode} from "react";

const InputTextField = ({
  label,
  name,
  required,
  error,
  children,
}: {
  label: string,
  name: string,
  required: boolean,
  error?: any,
  children: ReactNode,
}) => {
  return (
    <div>
      <label id={name}>{label}
        {required && <span className={"text-red-500"}>*</span>}
      </label>
      {children}
      {error && <span className="text-error">{error.message}</span>}
    </div>
  )
}

export default InputTextField