import { useCallback } from "react";
import { Input } from "../ui/input";

interface OInputProps extends React.ComponentProps<typeof Input> {
  onValueChange?: (value: string) => void;
}

export default function OInput(props: OInputProps) {
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    props.onValueChange?.(e.target.value)
    return props.onChange?.(e)
  }, [props])
  return <Input {...props} onChange={onChange} />;
}
