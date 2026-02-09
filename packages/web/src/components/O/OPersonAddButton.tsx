import OBaseButton from "./OBaseButton";

export default function OPersonAddButton(props: Omit<React.ComponentProps<typeof OBaseButton>, "icon">) {
  return <OBaseButton
    icon={"i-material-symbols-light-person-add-outline hover:i-material-symbols-light-person-add"}
    {...props}
  />
}
