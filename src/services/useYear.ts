import { useEffect, useState } from "react"
import { genYear, GenYearOptions } from "../elements/Year"
import { useStore } from "./useStore"

export const useYear = (id?: string) => {
  const store = useStore()
  const [elemId, setElemId] = useState<string>()

  const create = (options: GenYearOptions) => {
    const content = genYear(options)
    if (!elemId) {
      store.years.push(content)
      setElemId(content.id)
    }
  }

  useEffect(() => {
    const getById = (id: string) => {
      for (const item of store.years) {
        if (item.id === id) return item.id
      }
    }
    if (id) {
      setElemId(getById(id))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return { create }
}
