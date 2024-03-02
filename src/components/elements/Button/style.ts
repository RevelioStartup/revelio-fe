import { VariantProps, cva } from 'class-variance-authority'

export const ButtonVariants = cva(
  'px-5 py-2 rounded-2xl flex flex-row items-center gap-2',
  {
    variants: {
      variant: {
        primary: 'bg-teal-400 text-white hover:bg-teal-500',
        secondary: 'bg-white text-teal-600 hover:bg-teal-50',
        ghost: 'text-teal-700 hover:text-teal-800',
      },
      intent: {
        active: '',
        disabled: 'cursor-not-allowed opacity-80',
      },
      width: {
        auto: 'w-auto',
        full: 'w-full',
        '1/2': 'w-1/2',
      },
    },
    defaultVariants: {
      variant: 'primary',
      intent: 'active',
      width: 'full',
    },
  }
)
export type ButtonCVAProps = VariantProps<typeof ButtonVariants>
