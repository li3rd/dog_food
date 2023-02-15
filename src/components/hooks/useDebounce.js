import { useEffect, useState } from 'react'


export const useDebounce = (value, ms=300) => {
  const [dbValue, setDbValue] = useState(value)
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDbValue(value)
    }, ms)
    return () => {
      clearTimeout(timeOut)
    }
  }, [value, ms])
  return dbValue
}