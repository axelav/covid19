import useFetch from './useFetch'

const getData = data => {
  if (!data || data.errors) {
    return null
  } else {
    return data
  }
}

const getErrorMessage = (error, data) => {
  if (error) {
    return error.message
  } else {
    return null
  }
}

const useDailyUSRecords = () => {
  const { data, error } = useFetch('https://covidtracking.com/api/us/daily')

  return {
    data: getData(data),
    errorMessage: getErrorMessage(error, data),
    error
  }
}

const useCurrentUSRecords = () => {
  const { data, error } = useFetch('https://covidtracking.com/api/us')

  return {
    data: getData(data),
    errorMessage: getErrorMessage(error, data),
    error
  }
}

const useDailyStatesRecords = () => {
  const { data, error } = useFetch('https://covidtracking.com/api/states/daily')

  return {
    data: getData(data),
    errorMessage: getErrorMessage(error, data),
    error
  }
}

export {
  useDailyUSRecords,
  useCurrentUSRecords,
  useDailyStatesRecords
}
