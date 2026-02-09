import { InputGroup, InputGroupAddon } from "../ui/input-group";
import cc from "classcat";
import css from './OListItem.module.scss'

interface OListItemProps {
  children: React.ReactNode;
  blockStart?: React.ReactNode;
  onUpItem: () => void;
  disabledUpItem?: boolean;
  onDownItem: () => void;
  disabledDownItem?: boolean;
  onAddItem: () => void;
  disabledAddItem?: boolean;
  onRemoveItem: () => void;
  disabledRemoveItem?: boolean;
}

export default function OListItem (props: OListItemProps) {
  const upItem = () => {
    if (props.disabledUpItem) return
    props.onUpItem()
  }
  const downItem = () => {
    if (props.disabledDownItem) return
    props.onDownItem()
  }
  const addItem = () => {
    if (props.disabledAddItem) return
    props.onAddItem()
  }
  const removeItem = () => {
    if (props.disabledRemoveItem) return
    props.onRemoveItem()
  }
  const UpComp = () => <>
    <div
      className={cc([
        "size-5 i-material-symbols-light-expand-circle-up-outline",
        {
          'cursor-pointer': !props.disabledUpItem,
          'cursor-not-allowed opacity-50': props.disabledUpItem,
        },
      ])}
      onClick={() => upItem()}
      aria-disabled={props.disabledUpItem}
    ></div>
  </>
  const DownComp = () => <>
    <div
      className={cc([
        "size-5 i-material-symbols-light-expand-circle-down-outline",
        {
          'cursor-pointer': !props.disabledDownItem,
          'cursor-not-allowed opacity-50': props.disabledDownItem,
        },
      ])}
      onClick={() => downItem()}
      aria-disabled={props.disabledDownItem}
    ></div>
  </>
  const AddComp = () => <>
    <div
      className={cc([
        "size-5 i-material-symbols-light-add-circle-outline",
        {
          'cursor-pointer': !props.disabledAddItem,
          'cursor-not-allowed opacity-50': props.disabledAddItem,
        },
      ])}
      onClick={() => addItem()}
    ></div>
  </>
  const RemoveComp = () => <>
    <div
      className={cc([
        "size-5 i-material-symbols-light-do-not-disturb-on-outline",
        {
          'cursor-pointer': !props.disabledRemoveItem,
          'cursor-not-allowed opacity-50': props.disabledRemoveItem,
        },
      ])}
      onClick={() => removeItem()}
    ></div>
  </>
  return <>
    <InputGroup className={css.OListItem}>
      {
        props.children
      }
      {
        props.blockStart ? <>
          <InputGroupAddon align="block-start" className="justify-between">
            <div className="flex flex-row gap-1">
              <UpComp />
              <DownComp />
            </div>
            {props.blockStart}
            <div className="flex flex-row gap-1">
              <AddComp />
              <RemoveComp />
            </div>
          </InputGroupAddon>
        </> : <>
          <InputGroupAddon align="inline-start" className="gap-1">
            <UpComp />
            <DownComp />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end" className="gap-1">
            <AddComp />
            <RemoveComp />
          </InputGroupAddon>
        </>
      }
    </InputGroup>
  </>;
}
