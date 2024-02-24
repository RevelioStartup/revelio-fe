import { VariantProps, cva } from 'class-variance-authority'

export const InputVariants = cva(
  'flex w-full rounded-md bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        active: 'border-none font-600 ',
      },
      color: {
        white: 'bg-slate-100 text-slate-600 placeholder:text-slate-400',
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

export const SelectVariants = cva('', {
  variants: {
    variant: {
      selected: '',
    },
  },
  defaultVariants: {
    variant: 'selected',
  },
})

export type InputCVAProps = VariantProps<typeof InputVariants>
export type SelectCVAProps = VariantProps<typeof SelectVariants>
