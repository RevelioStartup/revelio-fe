import React, { FC } from 'react'
import { useFieldArray, useFormContext, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Input } from './input'

import { twMerge } from 'tailwind-merge'
import { InputVariants } from './style'
import { Button } from '../Button'

interface AddableInputFieldProps {
  name: string
  placeholder?: string
  errorMsg?: string
  addButtonText?: string
}
interface ChipItem {
  id?: string
  name: string
  description: string
}
export const AddableInputField: FC<AddableInputFieldProps> = ({
  name,
  placeholder,
  addButtonText,
  errorMsg = 'Item exists',
}) => {
  const { control, watch } = useFormContext()
  const { fields, append, remove } = useFieldArray({ control, name })

  const handleAddField = () => {
    append({ name: '', description: '' })
  }

  const watchFields = watch(name)
  const handleSetActiveItem = (item: ChipItem, index: number) => {
    const duplicateItem = watchFields.find(
      (field: ChipItem, fieldIndex: number) => {
        return fieldIndex !== index && field.name === item.name
      }
    )

    if (duplicateItem) {
      toast.error(errorMsg)
      return
    }
  }

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
              name={`${name}[${index}].name`}
              className={twMerge(InputVariants())}
              data-testid={`${name}.${index}.name`}
              placeholder={placeholder}
              required
            />

            <Input
              control={control!}
              name={`${name}[${index}].description`}
              className={twMerge(InputVariants())}
              data-testid={`${name}.${index}.description`}
              placeholder={'Enter step description'}
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
          append({ name: '', description: '' })
        }}
        rightIcon={<i className="i-ph-plus size-6" />}
        className="justify-between"
      >
        {addButtonText}
      </Button>
    </div>
  )
}
