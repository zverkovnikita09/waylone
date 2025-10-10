"use client";
import {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Title,
  Description,
  Close,
} from "@radix-ui/react-dialog";
import { PropsWithChildren, ReactNode } from "react";

interface PopupProps {
  TriggerButton: JSX.Element;
  children?: (props: { Title: typeof Title; Close: typeof Close }) => ReactNode;
}

export const Popup = ({ TriggerButton, children }: PopupProps) => (
  <Root>
    <Trigger asChild>{TriggerButton}</Trigger>
    <Portal>
      <Overlay className="fixed inset-0 bg-[#000000cc] data-[state=open]:animate-overlayShow z-modal" />
      <Content className="fixed left-1/2 top-1/2 max-h-[85vh] max-w-[500px] -translate-x-1/2 -translate-y-1/2 z-modal /* shadow-[var(--shadow-6)] */ focus:outline-none data-[state=open]:animate-contentShow">
        {children?.({ Title, Close }) ?? <Title></Title>}
      </Content>
    </Portal>
  </Root>
);

