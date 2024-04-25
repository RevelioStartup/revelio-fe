import React, { FC } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Input } from './input'

import { twMerge } from 'tailwind-merge'
import { InputVariants } from './style'
import { Button } from '../Button'

interface AddableInputRundownFieldProps {
  name: string
  errorMsg?: string
  addButtonText?: string
}
export const AddableInputRundownField: FC<AddableInputRundownFieldProps> = ({
  name,
  addButtonText,
}) => {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({ control, name })

  return (
    <div className="flex flex-col w-full gap-3 px-4 py-3">
      {fields.map((item, index) => (
        <div
          key={item.id}
          className="flex flex-row gap-3 items-center justify-between w-full"
        >
          <p className="font-bold text-xl text-teal-800 self-start border border-teal-800 rounded-xl size-10 flex justify-center items-center">
            {index + 1}
          </p>
          <div className="flex flex-col gap-2 w-full">
            <Input
              control={control!}
              name={`${name}[${index}].description`}
              className={twMerge(InputVariants())}
              data-testid={`${name}.${index}.description`}
              placeholder={'Enter activity description'}
              required
            />
            <Input
              control={control!}
              name={`${name}[${index}].start_time`}
              className={twMerge(InputVariants())}
              data-testid={`${name}.${index}.start_time`}
              placeholder={'Enter activity start time'}
              type='time'
              required
            />
            <Input
              control={control!}
              name={`${name}[${index}].end_time`}
              className={twMerge(InputVariants())}
              data-testid={`${name}.${index}.end_time`}
              placeholder={'Enter activity end time'}
              type='time'
              required
            />
          </div>
          <button
            onClick={() => {
              remove(index)
            }}
          >
            <i className="i-ph-trash-bold size-6 text-rose-600" />
          </button>
        </div>
      ))}

      <Button
        width={'full'}
        variant={'ghost'}
        data-testid="addable-input-add-button"
        onClick={() => {
          append({ description: '', start_time:'00:00', end_time:'00:00' })
        }}
        rightIcon={<i className="i-ph-plus size-6" />}
        className="justify-between"
      >
        {addButtonText}
      </Button>
    </div>
  )
}
