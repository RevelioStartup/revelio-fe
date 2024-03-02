'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button } from '@/components/elements/Button'
import { AISuggestionFormType } from '@/types/aiSuggestion'
import { TextArea } from '@/components/elements/Forms/textarea'

interface AIAsideProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  theme?: string
}
export const AIAside = ({ isOpen, setIsOpen, theme }: AIAsideProps) => {
  const defaultValues: AISuggestionFormType = {
    event_id: 0,
    prompt: '',
  }

  const methods = useForm<AISuggestionFormType>({
    defaultValues: defaultValues,
  })
  const { control, handleSubmit, setValue } = methods

  const onSubmit: SubmitHandler<AISuggestionFormType> = async (data) => {
    console.log(data)
  }
  return (
    <motion.aside
      data-testid="ai-aside"
      initial={{ x: '100%' }}
      animate={{ x: isOpen ? 0 : '100%' }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed top-0 right-0 h-full bg-white z-50 shadow-lg flex flex-col gap-3 w-full lg:w-96"
    >
      <div className="w-full bg-emerald-500 px-4 py-3 text-white font-bold relative">
        <p>Ask AI for suggestions.</p>
        <div
          onClick={() => {
            setIsOpen(false)
          }}
          onKeyDown={() => {
            setIsOpen(false)
          }}
          className="cursor-pointer"
        >
          <i className="i-ph-x-bold size-5 absolute top-1 translate-y-1/2 text-white right-4" />
        </div>
      </div>
      <div className="px-4 py-3 flex flex-col gap-3 h-full">
        <div className="flex flex-wrap gap-2">
          <button
            data-testid="prompt-example-venue"
            className="bg-slate-200 rounded-full px-2 py-1 text-sm"
            onClick={() => {
              setValue('prompt', 'Best venue for')
            }}
          >
            Best venue for ...
          </button>
          <button
            data-testid="prompt-example-vendor"
            className="bg-slate-200 rounded-full px-2 py-1 text-sm"
            onClick={() => {
              setValue('prompt', 'Vendors for')
            }}
          >
            Vendors for ...
          </button>
        </div>
        <div data-testid="content" className="grow">
          <div></div>
        </div>
        <div className="flex flex-row items-end gap-2 w-full">
          <TextArea
            data-testid="ai-input"
            className="w-full"
            control={control}
            name="prompt"
            placeholder="Ask AI to help planning your event"
            required
          />
          <Button
            data-testid="ai-aside-button"
            width={'auto'}
            onClick={handleSubmit(onSubmit)}
            className="whitespace-nowrap"
          >
            Ask AI
          </Button>
        </div>
      </div>
    </motion.aside>
  )
}
