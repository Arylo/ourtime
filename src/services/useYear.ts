import { genYear, GenYearOptions } from "../elements/Year"
import { useStore } from "./useStore"

export const useYear = () => {
  const [store, setStore] = useStore()
  const { years } = store
  return {
    list: years,
    create: (options: GenYearOptions) => {
      setStore({ years: [...years, genYear(options)] })
    },
  }
}

export default useYear
