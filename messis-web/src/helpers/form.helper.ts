import { toast } from 'react-toastify'

export function show_form_error_message(errorResponse,setFormError) {
  let errorMessages = errorResponse.response.data
  if (typeof errorMessages === 'object' && !Array.isArray(errorMessages)) {
    for (let key in errorMessages) {
      setFormError(key, {
        type: 'manual',
        message: errorMessages[key],
      })
    }
  } else {
    toast.error(errorMessages[0])
  }
}

