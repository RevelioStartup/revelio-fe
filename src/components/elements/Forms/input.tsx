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
          <div>
            {label && (
              <p className="text-lg text-brown mb-3 flex flex-col">
                <span>{label}</span>
                {caption && (
                  <span className="text-brown-light-active text-base">
                    {caption}
                  </span>
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
                    <i className="i-ph-eye text-brown-light-active size-6" />
                  ) : (
                    <i className="i-ph-eye-closed text-brown-light-active size-6" />
                  )}
                </div>
              )}
              {required && !!watchValidation && !watchValidation(name) && (
                <div className="absolute top-[16px] right-1">
                  <i className="i-ph-info size-5 text-danger" />
                </div>
              )}
            </div>
            {!!error && (
              <p
                className={twMerge(
                  'flex flex-row items-center gap-x-1 font-normal text-danger text-xs pl-2 mb-1'
                )}
              >
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
