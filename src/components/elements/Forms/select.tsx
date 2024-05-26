import React, { FC } from 'react'
import { Controller, useController } from 'react-hook-form'
import { SelectType } from './interface'
import { twMerge } from 'tailwind-merge'
import { SelectVariants } from './style'

export const Select: FC<SelectType> = ({
  label,
  name,
  options,
  control,
  required,
  rules,
  placeholder,
  variant,
  ...props
}) => {
  const {
    formState: { errors },
  } = useController({
    name,
    control,
  })
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required, ...rules }}
      render={({ field }) => (
        <div>
          <div className="flex flex-col gap-3">
            <label>{label}</label>
            <select
              {...field}
              {...props}
              className={twMerge(SelectVariants({ variant }))}
            >
              {placeholder && (
                <option
                  disabled
                  hidden
                  value=""
                  className="text-slate-200 opacity-50"
                >
                  {placeholder}
                </option>
              )}
              {options.map(({ value, label }, index) => (
                <option key={index} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          {Boolean(errors[name]) && (
            <p className="flex flex-row items-center gap-x-2 font-normal text-red-400 text-sm pt-1">
              <i className="i-ph-info size-4 text-red-400" />
              {errors[name]!['type'] == 'required'
                ? 'Please complete this field before you move on to the next page'
                : errors[name]!['message']?.toString()}
            </p>
          )}
        </div>
      )}
    />
  )
}
