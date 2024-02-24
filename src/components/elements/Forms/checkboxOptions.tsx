import React, { FC } from 'react'
import { CheckBoxOptionProps } from './interface'
import { twMerge } from 'tailwind-merge'
import { CheckBoxVariants } from './style'

export const CheckboxOptions: FC<CheckBoxOptionProps> = ({
  id,
  value,
  name,
  label,
  selectedValue,
  onChange,
}) => {
  return (
    <div className="flex flex-row gap-2">
      <input
        onChange={onChange}
        id={id ?? name}
        name={name}
        type="checkbox"
        value={value}
        checked={selectedValue?.includes(value)}
        className={twMerge(CheckBoxVariants({ intent: 'active' }))}
      />
      <p>{label ?? name}</p>
    </div>
  )
}
