import { getStory } from "@ourtime/store"
import useStoryIds from "../../queries/useStoryIds"
import { useNavigate } from "react-router"

export default function PageHeader () {
  const ids = useStoryIds()
  const navigate = useNavigate()
  return <>
    <div className="w-full h-[46px] flex items-center px-4 gap-2">
      <div
        className="text-lg font-semibold"
        onClick={() => navigate('/')}
      >Home</div>
      {
        ids.map((id) => {
          return <div
            key={id}
            className="text-sm text-gray-500"
            onClick={() => navigate(`/story/${id}`)}
          >{getStory(id).name}</div>
        })
      }
    </div>
  </>
}
