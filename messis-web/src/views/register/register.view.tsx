import { type SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {useNavigate} from "react-router";
import {useFormState} from "react-dom";
import InputTextField from "../../components/form/inputtext.field.tsx";
import InputText from "../../components/form/inputtext.element.tsx";
import {registerSchema, type RegisterFormValue} from "../../commons/types.ts";
import {useLogin} from "../login/use-login.hook.ts";
import {actions as authActions} from "../../stores/auth.store.ts";
import {useRegister} from "../../hooks/use-register.api.ts";
import {toast} from "react-toastify";

const Register = () => {
  const navigate = useNavigate()

  const {
    register,
    formState: { errors },
    setError,
    handleSubmit
  } = useForm<RegisterFormValue>({resolver: zodResolver(registerSchema)})

  const registerMutation = useRegister({
    onError: () => {
      setError("email", {
        type: "server",
        message: "Wrong email or password",
      })
    },
    onSuccess: (data) => {
      toast("Register success, Please login")
      navigate("/")
    },
  })

  const onSubmit: SubmitHandler<RegisterFormValue> = (data) => {
    console.log(data)
    registerMutation.execute(data)
  }

  console.log(errors)

  return (
    <div className="flex items-center justify-center h-screen w-screen h-screen">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Register</legend>

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <InputTextField
              label={"Email"}
              name={"email"}
              error={errors?.email}
              required={true}
            >
              <InputText
                placeholder={"email"}
                control={register("email")}
                error={errors?.email}
                required
              />
            </InputTextField>

            <InputTextField
              label={"Password"}
              name={"password"}
              error={errors?.password}
              required={true}
            >
              <InputText
                type={"password"}
                placeholder={"password"}
                control={register("password")}
                error={errors?.password}
                required
              />
            </InputTextField>

            <InputTextField
              label={"First Name"}
              name={"firstname"}
              error={errors?.firstname}
              required={true}
            >
              <InputText
                type={"firstname"}
                placeholder={"firstname"}
                control={register("firstname")}
                error={errors?.firstname}
                required
              />
            </InputTextField>

            <InputTextField
              label={"Last Name"}
              name={"lastname"}
              error={errors?.lastname}
              required={true}
            >
              <InputText
                type={"lastname"}
                placeholder={"lastname"}
                control={register("lastname")}
                error={errors?.lastname}
                required
              />
            </InputTextField>

            <InputTextField
              label={"Company Name"}
              name={"company_name"}
              error={errors?.company_name}
              required={true}
            >
              <InputText
                type={"company_name"}
                placeholder={"company_name"}
                control={register("company_name")}
                error={errors?.company_name}
                required
              />
            </InputTextField>

          </fieldset>

          <button className="btn btn-neutral mt-4">Submit</button>
        </form>
      </fieldset>
    </div>
  )
}

export default Register