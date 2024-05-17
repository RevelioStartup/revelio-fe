import { cva } from 'class-variance-authority'

const CHIP_STYLE = '!font-bold !p-5 !border-none'

export const CHIP_STYLE_ACTIVE = CHIP_STYLE + ' ' + '!bg-teal-600 !text-teal-50'

export const CHIP_STYLE_INACTIVE =
  CHIP_STYLE + ' ' + '!bg-teal-50 !text-teal-400'

export const StatusVariants = cva('font-bold', {
  variants: {
    variant: {
      success: 'text-emerald-500',
      error: 'text-rose-500',
      pending: 'text-gray-500',
    },
  },
  defaultVariants: {
    variant: 'pending',
  },
})

export const HoverRowVariants = cva('hover:scale-[1.001]', {
  variants: {
    hover: {
      success: 'hover:bg-emerald-50',
      error: 'hover:bg-rose-50',
      pending: 'hover:bg-gray-50',
    },
  },
})
