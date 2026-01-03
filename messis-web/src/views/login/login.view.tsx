import { useForm } from "react-hook-form"
import InputText from "../../components/form/inputtext.element"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import InputTextField from "../../components/form/inputtext.field"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

const Login = () => {
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (data) => {
    console.log(data)
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
          </fieldset>

          <button className="btn btn-neutral mt-4">Login</button>
        </form>
      </fieldset>
    </div>
  )
}

export default Login
