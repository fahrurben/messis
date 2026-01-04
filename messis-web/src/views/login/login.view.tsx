import { type SubmitHandler, useForm } from "react-hook-form"
import InputText from "../../components/form/inputtext.element"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import InputTextField from "../../components/form/inputtext.field"
import { useLogin } from "./use-login.hook.ts"
import { actions as authActions } from "../../stores/auth.store.ts"
import type { LoginResponse } from "../../commons/types.ts"
import { useNavigate } from "react-router"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  subdomain: z.string().min(3),
})

type FormValues = {
  email: string
  password: string
  subdomain: string
}

const Login = () => {
  const navigate = useNavigate()

  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const loginMutation = useLogin({
    onError: () => {
      setError("email", {
        type: "server",
        message: "Wrong email or password",
      })
    },
    onSuccess: (data: LoginResponse) => {
      authActions.setToken(data.access)
      navigate("/")
    },
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    loginMutation.execute(data)
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen h-screen">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <InputTextField
              label={"Email"}
              name={"email"}
              error={errors?.email}
              required={true}
            >
              <InputText
                name={"email"}
                placeholder={"email"}
                register={register}
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
                name={"password"}
                type={"password"}
                placeholder={"password"}
                register={register}
                error={errors?.password}
                required
              />
            </InputTextField>
            <InputTextField
              label={"Subdomain"}
              name={"subdomain"}
              error={errors?.subdomain}
              required={true}
            >
              <InputText
                name={"subdomain"}
                type={"subdomain"}
                placeholder={"subdomain"}
                register={register}
                error={errors?.subdomain}
                required
              />
            </InputTextField>
          </fieldset>

          <button className="btn btn-neutral mt-4">Login</button>
        </form>
      </fieldset>
    </div>
  )
}

export default Login
