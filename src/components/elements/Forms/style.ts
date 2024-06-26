import { VariantProps, cva } from 'class-variance-authority'

export const InputVariants = cva(
  'flex w-full rounded-md bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 rounded-2xl px-5 py-4 placeholder:font-medium font-medium text-slate-600',
  {
    variants: {
      variant: {
        active: '!border !border-teal-100',
      },
      color: {
        white: '!bg-white text-slate-800 placeholder:text-slate-400',
        teal: 'bg-teal-400 text-white placeholder:text-teal-200',
      },
      border: {
        gray: 'border border-gray-200',
      },
    },
    defaultVariants: {
      variant: 'active',
      color: 'white',
    },
  }
)

export const SelectVariants = cva('py-2 px-3 bg-slate-100 text-slate-800', {
  variants: {
    variant: {
      normal: '',
      rounded: 'rounded-full px-4',
    },
  },
  defaultVariants: {
    variant: 'normal',
  },
})
export const CheckBoxVariants = cva(
  'w-5 h-5 rounded-full border border-gray-light accent-teal-300 focus:outline-none focus:ring-0 active:outline-none active:ring-0',
  {
    variants: {
      intent: {
        active: 'cursor-pointer text-accent',
        disabled: 'cursor-not-allowed text-secondary-light-active',
      },
    },
  }
)
export type InputCVAProps = VariantProps<typeof InputVariants>
export type SelectCVAProps = VariantProps<typeof SelectVariants>
