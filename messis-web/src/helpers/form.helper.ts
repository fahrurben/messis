import { toast } from "react-toastify"

// @ts-ignore
export function show_form_error_message(errorResponse, setFormError) {
  const errorMessages = errorResponse.response.data
  if (typeof errorMessages === "object" && !Array.isArray(errorMessages)) {
    for (const key in errorMessages) {
      setFormError(key, {
        type: "manual",
        message: errorMessages[key],
      })
    }
  } else {
    toast.error(errorMessages[0])
  }
}
