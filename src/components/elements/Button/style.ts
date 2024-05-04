import { VariantProps, cva } from 'class-variance-authority'

export const ButtonVariants = cva(
  'rounded-2xl flex flex-row items-center gap-2 justify-center',
  {
    variants: {
      variant: {
        primary: 'bg-teal-600 text-white hover:bg-teal-500',
        secondary: 'bg-teal-400 text-white hover:bg-teal-300',
        ghost:
          'text-teal-400 hover:text-teal-600 border border-teal-400 hover:border-teal-400',
        danger: 'text-rose-600 text-white hover:bg-rose-400 bg-rose-500',
      },
      intent: {
        active: '',
        disabled: 'cursor-not-allowed bg-slate-400 text-white',
      },
      width: {
        auto: 'w-auto',
        full: 'w-full',
        '1/2': 'w-1/2',
      },
      size: {
        large: 'px-5 py-4 rounded-xl',
        medium: 'px-4 py-3 rounded-xl',
        small: 'px-4 py-2 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      intent: 'active',
      width: 'auto',
      size: 'medium',
    },
  }
)
export type ButtonCVAProps = VariantProps<typeof ButtonVariants>
