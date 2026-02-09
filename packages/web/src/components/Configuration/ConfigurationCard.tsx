import { type PropsWithChildren, type ReactNode } from "react";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import cc from "classcat";
import OButtonSuspense from "../O/OButtonSuspense";

export interface ConfigurationCardProps {
  title: ReactNode;
  action?: ReactNode;
  description?: ReactNode;
}

export default function ConfigurationCard(props: PropsWithChildren<ConfigurationCardProps>) {
  return (<>
    <Card className="border-none">
      <CardHeader
        className={cc({
          "gap-0": props.description,
        })}
      >
        <CardTitle className="leading-[36px]">
          {props.title}
        </CardTitle>
        {
          !props.description ? null : (<>
            <CardDescription>{props.description}</CardDescription>
          </>)
        }
        <CardAction className="min-h-[36px] flex flex-row justify-center items-center gap-1">
          <OButtonSuspense>
            {props.action}
          </OButtonSuspense>
        </CardAction>
      </CardHeader>
      <CardContent>
        {props.children}
      </CardContent>
    </Card>
  </>);
}
