import InputTextField from "../../components/form/inputtext.field.tsx"
import InputText from "../../components/form/inputtext.element.tsx"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from 'react-toastify'
import { useGetProfile, useUpdateProfile} from "../../hooks/use-profile.api.ts"
import { store as authStore } from "../../stores/auth.store"
import { useSnapshot } from "valtio/react"
import { useEffect } from "react"
import {show_form_error_message} from "../../helpers/form.helper.ts";

const formSchema = z.object({
  firstname: z.string().min(3),
  lastname: z.string().min(3),
  title: z.string().min(3),
  capacity: z.coerce.number(),
  bill_rate: z.coerce.number(),
  cost_rate: z.coerce.number(),
})

type FormValues = z.infer<typeof formSchema>

const ProfileView = () => {
  const { userId } = useSnapshot(authStore)

  const {
    register,
    formState: { errors },
    setError,
    reset,
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const { data: profileData } = useGetProfile(userId)

  const useUpdateMutation = useUpdateProfile({
    onSuccess: () => {
      toast("Profile successfully updated")
    },
    onError: (errorResponse) => {
      show_form_error_message(errorResponse, setError)
    },
  })

  useEffect(() => {
    if (profileData != null) {
      reset({ ...profileData })
    }
  }, [profileData])

  const onSubmit = (formData: FormValues) => {
    useUpdateMutation.mutate({id: userId, ...formData})
  }

  return (
    <div className="flex items-center justify-center py-8">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-8/12 border p-4">
        <legend className="fieldset-legend">Profile</legend>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputTextField
              label={"First Name"}
              name={"firstname"}
              error={errors?.firstname}
              required={true}
            >
              <div className="w-full">
                <InputText
                  name={"firstname"}
                  placeholder={"First Name"}
                  register={register}
                  error={errors?.firstname}
                  required
                />
              </div>
            </InputTextField>

            <InputTextField
              label={"Last Name"}
              name={"lastname"}
              error={errors?.lastname}
              required={true}
            >
              <div className="w-full">
                <InputText
                  name={"lastname"}
                  placeholder={"lastname"}
                  register={register}
                  error={errors?.lastname}
                  required
                />
              </div>
            </InputTextField>

            <InputTextField
              label={"Title"}
              name={"title"}
              error={errors?.title}
              required={true}
            >
              <div className="w-full">
                <InputText
                  name={"title"}
                  placeholder={"Title"}
                  register={register}
                  error={errors?.title}
                  required
                />
              </div>
            </InputTextField>

            <InputTextField
              label={"Bill Rate"}
              name={"bill_rate"}
              error={errors?.bill_rate}
              required={false}
            >
              <div className="w-full">
                <InputText
                  name={"bill_rate"}
                  placeholder={"Bill Rate"}
                  register={register}
                  type={"number"}
                  error={errors?.bill_rate}
                  required
                />
              </div>
            </InputTextField>

            <InputTextField
              label={"Cost Rate"}
              name={"cost_rate"}
              error={errors?.cost_rate}
              required={false}
            >
              <div className="w-full">
                <InputText
                  name={"cost_rate"}
                  placeholder={"Cost Rate"}
                  register={register}
                  type={"number"}
                  error={errors?.cost_rate}
                  required
                />
              </div>
            </InputTextField>
          </div>
          <div className="w-full flex justify-end mt-4">
            <button className="btn btn-neutral">Submit</button>
          </div>
        </form>
      </fieldset>
    </div>
  )
}

export default ProfileView
