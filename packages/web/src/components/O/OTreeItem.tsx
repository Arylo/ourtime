import * as React from "react"
import { cn } from "@/lib/utils"

export interface OTreeItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  icon: React.ReactNode;
}

const OTreeItem = React.forwardRef<HTMLDivElement, OTreeItemProps>((
  { className, label, icon, onClick, children, ...props },
  ref
) => {
  const hasChildren = React.Children.count(children) > 0

  return (
    <div ref={ref} className={cn("select-none", className)} {...props}>
      <div
        className={cn([
          "py-1 px-2",
          "flex flex-row justify-start items-center gap-1",
          "rounded-sm transition-colors",
          { "cursor-pointer": onClick}
        ])}
        onClick={onClick}
      >
        <div className="flex justify-center items-center size-4">
          {icon}
        </div>

        <span className="min-h-4 truncate font-medium">{label}</span>
      </div>

      {hasChildren && (
        <div className="ml-4 border-l pl-2">
          {children}
        </div>
      )}
    </div>
  )
})
OTreeItem.displayName = "OTreeItem"

export default OTreeItem
