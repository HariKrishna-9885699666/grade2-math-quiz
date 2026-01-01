import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-bold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md",
        outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Kid-friendly custom variants
        cta: "bg-gradient-cta text-cta-foreground shadow-button hover:shadow-lg hover:-translate-y-0.5 font-extrabold text-lg px-8 py-6",
        success: "bg-gradient-success text-success-foreground shadow-md hover:shadow-lg",
        option: "bg-card text-card-foreground border-2 border-secondary hover:border-primary hover:bg-secondary/50 shadow-sm text-left justify-start min-h-[56px]",
        optionSelected: "bg-accent text-accent-foreground border-2 border-accent shadow-md text-left justify-start min-h-[56px] font-bold",
        optionCorrect: "bg-success text-success-foreground border-2 border-success shadow-md text-left justify-start min-h-[56px]",
        optionWrong: "bg-destructive text-destructive-foreground border-2 border-destructive shadow-md text-left justify-start min-h-[56px]",
        nav: "bg-primary/10 text-primary hover:bg-primary/20 font-semibold",
        floating: "bg-cta text-cta-foreground shadow-button hover:shadow-lg rounded-full animate-pulse-ring",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
        iconLg: "h-14 w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
