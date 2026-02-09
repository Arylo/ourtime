import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

interface OBaseButtonProps extends React.ComponentProps<typeof Button> {
  icon?: string;
}

export default function OBaseButton({ className, icon, ...props }: OBaseButtonProps) {
  return (
    <Button
      {...props}
      className={cn(
        "size-6 hover:size-6",
        className,
        icon,
        { 'cursor-pointer': props.disabled !== true },
      )}
    />
  );
}
