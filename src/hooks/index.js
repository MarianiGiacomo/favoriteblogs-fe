import { useState } from 'react'

export const useField = (type, name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    name,
    type,
    value,
    onChange,
    setValue,
  }
}

export default {
  useField
}