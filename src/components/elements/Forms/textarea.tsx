import React, { FC, useRef } from 'react'
import { Controller } from 'react-hook-form'
import { TextAreaType } from './interface'
import { twMerge } from 'tailwind-merge'

import { InputVariants } from './style'
import useAutosizeTextArea from '@/utils/useAutosizeTextArea'

export const TextArea: FC<TextAreaType> = ({
  id,
  name,
  required = false,
  label,
  caption,
  control,
  disabled,
  rules,
  variant,
  color,
  border,
  className,
  watchValidation,
  ...props
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  return (
    <Controller
      control={control}
      name={name}
      rules={{ ...rules, required }}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useAutosizeTextArea(textAreaRef.current, value)
        return (
          <div className="w-full">
            {label && (
              <p className="text-xl text-slate-900 mb-3 flex flex-col">
                <span>{label}</span>
                {caption && (
                  <span className="text-slate-800 text-base">{caption}</span>
                )}
              </p>
            )}

            <div className="relative">
              <textarea
                className={twMerge(
                  InputVariants({ variant, color, border }),
                  className
                )}
                id={id ?? name}
                value={value}
                disabled={disabled}
                onChange={onChange}
                ref={textAreaRef}
                {...props}
              />
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
