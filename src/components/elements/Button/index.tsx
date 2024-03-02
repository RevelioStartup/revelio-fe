import React, { ReactNode } from 'react'
import { ButtonCVAProps, ButtonVariants } from './style'
import { twMerge } from 'tailwind-merge'

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonCVAProps {
  rightIcon?: ReactNode
  leftIcon?: ReactNode
  children: ReactNode
  loading?: boolean
  className?: string
}
export const Button = ({
  loading,
  children,
  rightIcon,
  leftIcon,
  variant,
  intent,
  width,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={twMerge(ButtonVariants({ variant, intent, width }), className)}
    >
      {!!leftIcon && <span>{leftIcon}</span>}
      <span>{children}</span>
      {!!rightIcon && <span>{rightIcon}</span>}
    </button>
  )
}
