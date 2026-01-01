import InputText from "./inputtext.element.tsx";

const InputTextField = ({
  label,
  name,
  required,
  error,
  children,
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