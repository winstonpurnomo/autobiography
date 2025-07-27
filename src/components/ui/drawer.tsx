"use client";

import { Drawer as GeistDrawer } from "@geist-ui/core";
import * as React from "react";
import { createContext, useContext, useState } from "react";

import { cn } from "@/lib/utils";

interface DrawerContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  placement?: "top" | "bottom" | "left" | "right";
  onClose?: () => void;
}

const DrawerContext = createContext<DrawerContextType | null>(null);

function useDrawerContext(): DrawerContextType {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("Drawer components must be used within a Drawer");
  }
  return context;
}

interface DrawerProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  direction?: "top" | "bottom" | "left" | "right";
  onClose?: () => void;
}

function Drawer({
  children,
  open: controlledOpen,
  onOpenChange,
  direction = "right",
  onClose,
  ...props
}: DrawerProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const setOpen = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
    if (!newOpen) {
      onClose?.();
    }
  };

  return (
    <DrawerContext.Provider
      value={{
        open,
        setOpen,
        placement: direction,
        onClose,
      }}
    >
      <div data-slot="drawer" {...props}>
        {children}
      </div>
    </DrawerContext.Provider>
  );
}

interface DrawerTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

function DrawerTrigger({
  children,
  asChild = false,
  onClick,
  className,
  ...props
}: DrawerTriggerProps) {
  const { setOpen } = useDrawerContext();

  const handleClick = (e: React.MouseEvent) => {
    onClick?.(e);
    setOpen(true);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: handleClick,
      "data-slot": "drawer-trigger",
      className: cn((children.props as any).className, className),
    });
  }

  return (
    <button
      className={className}
      data-slot="drawer-trigger"
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

function DrawerPortal({ children }: { children: React.ReactNode }) {
  return <div data-slot="drawer-portal">{children}</div>;
}

interface DrawerCloseProps {
  children: React.ReactNode;
  asChild?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

function DrawerClose({
  children,
  asChild = false,
  onClick,
  className,
  ...props
}: DrawerCloseProps) {
  const { setOpen } = useDrawerContext();

  const handleClick = (e: React.MouseEvent) => {
    onClick?.(e);
    setOpen(false);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: handleClick,
      "data-slot": "drawer-close",
      className: cn((children.props as any).className, className),
    });
  }

  return (
    <button
      className={className}
      data-slot="drawer-close"
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

function DrawerOverlay({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("fixed inset-0 z-50 bg-black/80", className)}
      data-slot="drawer-overlay"
      {...props}
    />
  );
}

interface DrawerContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function DrawerContent({ className, children, ...props }: DrawerContentProps) {
  const { open, setOpen, placement = "right", onClose } = useDrawerContext();

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  return (
    <GeistDrawer
      data-slot="drawer-content"
      onClose={handleClose}
      placement={placement}
      visible={open}
      wrapClassName={cn(
        "group/drawer-content",
        // Override Geist's default styling with theme-aware colors
        className
      )}
      {...props}
    >
      <div className="m-0 min-h-full p-0 text-foreground">{children}</div>
    </GeistDrawer>
  );
}

function DrawerHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 p-4", className)}
      data-slot="drawer-header"
      {...props}
    />
  );
}

function DrawerFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      data-slot="drawer-footer"
      {...props}
    />
  );
}

interface DrawerTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

function DrawerTitle({ className, children, ...props }: DrawerTitleProps) {
  return (
    <GeistDrawer.Title
      className={cn("font-semibold text-foreground tracking-tight", className)}
      data-slot="drawer-title"
      {...props}
    >
      {children}
    </GeistDrawer.Title>
  );
}

interface DrawerDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

function DrawerDescription({
  className,
  children,
  ...props
}: DrawerDescriptionProps) {
  return (
    <GeistDrawer.Subtitle
      className={cn("text-muted-foreground text-sm", className)}
      data-slot="drawer-description"
      {...props}
    >
      {children}
    </GeistDrawer.Subtitle>
  );
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
