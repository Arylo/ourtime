import { useEffect, useState } from "react"
import { genWorld } from "../elements/World"
import { useStore } from "./useStore"

export const useWorlds = (id?: string) => {
  const store = useStore()
  const [elemId, setElemId] = useState<string>()
  const [created, setCreated] = useState(false)

  const create = (name: string) => {
    const world = genWorld({ name })
    store.worlds.push(world)
    setElemId(elemId)
  }

  useEffect(() => {
    const getById = (id: string) => {
      const world = store.worlds.find(w => w.id === id)
      return world?.id
    }
    if (id) {
      setElemId(getById(id))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  useEffect(() => {
    setCreated(!!elemId)
  }, [elemId])

  return { create, created }
}
