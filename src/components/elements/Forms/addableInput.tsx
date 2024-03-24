import React, { FC } from 'react'
import { useFieldArray, useFormContext, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Input } from './input'
import { Button } from '@mui/material'
import { twMerge } from 'tailwind-merge'
import { InputVariants } from './style'

interface AddableInputFieldProps {
  name: string
  placeholder?: string
  errorMsg?: string
  addButtonText?: string
}
interface ChipItem {
  id: string
  name: string
  value: string
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
    append({ name: '', value: '' })
  }

  const watchFields = watch(name)
  const handleSetActiveItem = (item: ChipItem, index: number) => {
    const duplicateItem = watchFields.find(
      (field: ChipItem, fieldIndex: number) => {
        return fieldIndex !== index && field.value === item.value
      }
    )

    if (duplicateItem) {
      toast.error(errorMsg)
      return
    }
  }

  return (
    <div className="flex flex-col w-full">
      {fields.map((item, index) => (
        <div
          key={item.id}
          className="flex flex-row items-center justify-between w-full"
        >
          <Input
            control={control!}
            name={`${name}[${index}].name`}
            className={twMerge(InputVariants())}
            data-testid={`${name}.${index}`}
            placeholder={placeholder}
          />
          <button
            onClick={() => {
              remove(index)
            }}
          >
            <i className="i-ph-trash-bold size-5 text-rose-600" />
          </button>
        </div>
      ))}

      <Button
        data-testid="addable-input-add-button"
        onClick={() => {
          append({ name: '', value: '' })
        }}
      >
        {addButtonText}
      </Button>
    </div>
  )
}
