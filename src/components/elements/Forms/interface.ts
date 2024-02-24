import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'

import {
  RegisterOptions,
  Control,
  FieldValue,
  UseFormWatch,
} from 'react-hook-form'
import { InputCVAProps } from './style'

export type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>
export type TextareaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>

export type ControllerType = {
  control: Control<FieldValue<any>>
  rules?: Pick<
    RegisterOptions,
    | 'required'
    | 'min'
    | 'max'
    | 'minLength'
    | 'maxLength'
    | 'pattern'
    | 'validate'
  >
}

export type BaseInputType = {
  id?: string
  name: string
  label?: string
  caption?: string
  className?: string
  watchValidation?: UseFormWatch<any>
}

export type CustomInputProps = ControllerType &
  Pick<
    InputProps,
    | 'type'
    | 'required'
    | 'disabled'
    | 'placeholder'
    | 'defaultValue'
    | 'value'
    | 'onClick'
    | 'onBlur'
    | 'onKeyDown'
    | 'readOnly'
  > &
  BaseInputType &
  InputCVAProps

export type optionType = {
  label?: string
  value: string | number
}

export type CheckBoxType = ControllerType &
  Pick<InputProps, 'required' | 'disabled'> & {
    label?: string
    id?: string
    name: string
    value: any
    selectedValue?: any[]
    options: optionType[]
  }

export type CheckBoxProps = Pick<InputProps, 'required'> & {
  id?: string
  name: string
  setValue: (value: any) => void
  value: any
  selectedValue?: any[]
  options: optionType[]
}

export type TextAreaType = ControllerType &
  Pick<
    TextareaProps,
    | 'required'
    | 'disabled'
    | 'placeholder'
    | 'defaultValue'
    | 'value'
    | 'maxLength'
    | 'onClick'
    | 'onChange'
  > &
  BaseInputType &
  InputCVAProps & {
    rows?: number
  }

export type DateInputProps = ControllerType &
  BaseInputType &
  Pick<
    InputProps,
    'required' | 'disabled' | 'placeholder' | 'defaultValue' | 'value'
  > & {
    setValue?: (value: any) => void
  }

export type FileInputType = ControllerType &
  BaseInputType &
  Pick<InputProps, 'required'> & {
    fileTypes?: string[]
    disabled?: boolean
    submission: any
    setSubmission: (value: any) => void
    maxSize?: number
    multiple?: boolean
    isPreviewRounded?: boolean
    defaultPreviewLink?: string
    buttonLabel?: string
    businessName?: string
    placeholder?: string
  }

export type SelectType = ControllerType &
  BaseInputType &
  Pick<
    InputProps,
    'required' | 'disabled' | 'placeholder' | 'defaultValue' | 'value'
  > & {
    choices: optionType[]
    creatable?: boolean
  } & {
    onChange?: any
  }

export type RadioButtonType = ControllerType &
  Pick<InputProps, 'required'> & {
    label: string
    id?: string
    name: string
    selectedValue: string | number
    onChange: (value: string | number) => void
    options: optionType[]
  }

export type RadioProps = Pick<InputProps, 'required'> &
  ControllerType &
  BaseInputType & {
    watchValidation?: UseFormWatch<any>
    options: optionType[]
    title: string
  }
