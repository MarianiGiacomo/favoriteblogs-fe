const useField = (type, name) => {
  let value = ''

  function setValue(newValue){
    value = newValue
  }

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