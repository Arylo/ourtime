import OBaseButton from "./OBaseButton";

export default function OCancelButton(props: Omit<React.ComponentProps<typeof OBaseButton>, "icon">) {
  return <OBaseButton
    icon={"i-material-symbols-light-cancel-outline hover:i-material-symbols-light-cancel"}
    {...props}
  />
}
