'use client'
import React from 'react'

import { useForm, SubmitHandler } from 'react-hook-form'
import { Input } from '@/components/elements/Forms/input'
import { Button } from '@/components/elements/Button'
import { AISuggestionFormType } from '@/types/aiSuggestion'

export const AIAside = () => {
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
    <aside data-testid="ai-aside" className="flex flex-col px-4 py-3">
      <div>
        <button
          data-testid="prompt-example"
          className="bg-slate-400 rounded-full"
          onClick={() => {
            setValue('prompt', 'Best venue for a cocktail party')
          }}
        >
          Best venue for a cocktail party
        </button>
      </div>
      <div className="flex flex-row gap-2 self-end">
        <Input
          data-testid="ai-input"
          control={control}
          name="prompt"
          placeholder="Ask AI to help planning your event"
          required
        />
        <Button
          data-testid="ai-button"
          width={'auto'}
          onClick={handleSubmit(onSubmit)}
        >
          Ask AI
        </Button>
      </div>
    </aside>
  )
}
