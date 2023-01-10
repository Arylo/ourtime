import { genWorld, GenWorldOptions } from "../elements/World"
import { useStore } from "./useStore"

export const useWorld = () => {
  const [store, setStore] = useStore()
  const { worlds } = store
  return {
    list: worlds,
    create: (options: GenWorldOptions) => {
      setStore({ worlds: [...worlds, genWorld(options)] })
    },
    findById: (id: string) => worlds.find((item) => item.id === id),
  }
}

export default useWorld
