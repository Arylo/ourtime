import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '../../components/ui/empty.tsx'
import { Spinner } from '../../components/ui/spinner.tsx'

export default function LoadingPage () {
  return (
    <Empty className="w-dvw h-dvh">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
        </EmptyMedia>
        <EmptyTitle>Application Loading...</EmptyTitle>
      </EmptyHeader>
    </Empty>
  )
}
