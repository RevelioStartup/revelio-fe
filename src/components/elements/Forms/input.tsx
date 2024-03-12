import React, { FC, useRef, useState } from 'react'
import { Controller } from 'react-hook-form'
import { CustomInputProps } from './interface'
import { twMerge } from 'tailwind-merge'

import { InputVariants } from './style'

export const Input: FC<CustomInputProps> = ({
  id,
  name,
  required = false,
  label,
  caption,
  control,
  disabled,
  rules,
  type = 'text',
  className,
  watchValidation,
  variant,
  color,
  border,
  ...props
}) => {
  const [openPassword, setOpenPassword] = useState<boolean>(false)

  const inputRef = useRef<HTMLInputElement>(null) // Create a ref for the input

  return (
    <Controller
      control={control}
      name={name}
      rules={{ ...rules, required: required }}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <div className="w-full">
            {label && (
              <p className="text-lg text-slate-900 mb-3 flex flex-col">
                <span>{label}</span>
                {caption && (
                  <span className="text-slate-800 text-base">{caption}</span>
                )}
              </p>
            )}

            <div className="relative">
              <input
                ref={inputRef}
                className={twMerge(
                  InputVariants({ variant, color, border }),
                  className
                )}
                id={id ?? name}
                type={
                  type != 'password' ? type : openPassword ? 'text' : 'password'
                }
                value={value}
                disabled={disabled}
                onChange={(e) => {
                  onChange(e)
                }}
                {...props}
              />
              {type == 'password' && (
                <div
                  className="absolute top-3.5 right-3"
                  onClick={() => {
                    setOpenPassword(!openPassword)
                  }}
                >
                  {openPassword ? (
                    <i className="i-ph-eye text-slate-800 size-6" />
                  ) : (
                    <i className="i-ph-eye-closed text-slate-800 size-6" />
                  )}
                </div>
              )}
            </div>
            {!!error && (
              <p
                className={twMerge(
                  'flex flex-row items-center gap-x-1 font-normal text-red-400 text-xs pl-2 mb-1'
                )}
              >
                <i className="i-ph-info size-5 text-red-400" />
                {error!['type'] == 'required'
                  ? 'Please complete this field'
                  : error!['message']?.toString()}
              </p>
            )}
          </div>
        )
      }}
    />
  )
}
