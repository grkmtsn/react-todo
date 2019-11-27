export const checkTime = time => {
  if (time < 10) {
    return `0${time}`
  }
  return time;
}

export const isEmpty = obj => [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length;

export const validateForm = values => {
  const errors = {};
  Object.keys(values).forEach(value => {
    if (values[value].trim() === '') {
      errors[value] = true;
    }
  })
  return errors;
};