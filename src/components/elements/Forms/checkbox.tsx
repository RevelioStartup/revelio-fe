import React, { FC, useEffect, useState } from 'react'

import { CheckBoxType, optionType } from './interface'
import { Controller, useController } from 'react-hook-form'

import { CheckboxOptions } from './checkboxOptions'

export const Checkbox: FC<CheckBoxType> = ({
  label,
  options,
  name,
  setValue,
  control,
  required,
  ...props
}): JSX.Element => {
  const [selectedItems, setSelectedItems] = useState<any>([])

  const handleSelect = (value: any) => {
    const isPresent = selectedItems.indexOf(value)
    if (isPresent !== -1) {
      const remaining = selectedItems.filter((item: any) => item !== value)
      setSelectedItems(remaining)
    } else {
      setSelectedItems((prevItems: any) => [...prevItems, value])
    }
  }

  useEffect(() => {
    setValue(name, selectedItems)
  }, [selectedItems])
  const {
    formState: { errors },
  } = useController({
    name,
    control,
  })
  return (
    <Controller
      key={label}
      name={name}
      control={control}
      rules={{ required }}
      render={() => {
        return (
          <div>
            <p className="pb-2">{label}</p>
            <div className="grid grid-cols-1 gap-2 pl-4">
              {options.map(({ label, value }: optionType, idx: number) => {
                return (
                  <CheckboxOptions
                    key={idx}
                    label={label}
                    name={`${name}.${value ?? label}`}
                    value={value ?? label}
                    selectedValue={selectedItems}
                    onChange={() => {
                      handleSelect(value ?? label)
                    }}
                  />
                )
              })}
            </div>
            {!!errors[name] && (
              <p className="flex flex-row items-center gap-x-2 font-normal text-red-400 text-sm">
                <i className="i-ph-info size-4 text-red-400" />
                {errors[name]!['type'] == 'required'
                  ? 'Please complete this field before you move on to the next page'
                  : errors[name]!['message']?.toString()}
              </p>
            )}
          </div>
        )
      }}
    />
  )
}
