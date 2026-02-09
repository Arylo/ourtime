import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


type Option = {
  label?: string;
  options: { value: string; label: string; disabled?: boolean }[];
}

export interface OSelectProps {
  // #region Root
  disabled?: boolean;
  onValueChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  name?: string;
  required?: boolean;
  value?: string;
  defaultValue?: string;
  // #endregion Root
  // #region Trigger
  className?: string;
  // #endregion Trigger
  // #region Value
  placeholder?: string;
  // #endregion Value
  // #region Content
  position?: "item-aligned" | "popper";
  options: Option[];
  // #endregion Content
}

export default function OSelect(props: OSelectProps) {
  const {
    // #region Root
    disabled,
    onValueChange,
    open,
    defaultOpen,
    onOpenChange,
    name,
    required,
    value,
    defaultValue,
    // #endregion Root
    // #region Trigger
    className,
    // #endregion Trigger
    // #region Value
    placeholder,
    // #endregion Value
    // #region Content
    position = 'item-aligned',
    options,
    // #endregion Content
  } = props
  return (<>
    <Select
      disabled={disabled}
      onValueChange={onValueChange}
      value={value}
      defaultValue={defaultValue}
      name={name}
      required={required}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        position={position}
        className="bg-white"
      >
        {
          options.map((optionGroup, index) => (
            <SelectGroup key={index}>
              {
                optionGroup.label ? <SelectLabel>{optionGroup.label}</SelectLabel> : <></>
              }
              {
                optionGroup.options.map((option) => (
                  <SelectItem
                    key={`${index}-${option.value}`}
                    value={option.value}
                    disabled={option.disabled}
                  >{option.label}</SelectItem>
                ))
              }
            </SelectGroup>
          ))
      }
      </SelectContent>
    </Select>
  </>)
}
