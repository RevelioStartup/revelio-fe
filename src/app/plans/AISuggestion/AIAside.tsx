'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button } from '@/components/elements/Button'
import { AISuggestionFormType } from '@/types/aiSuggestion'
import { TextArea } from '@/components/elements/Forms/textarea'
import {
  useAiSuggestionHistoryListQuery,
  useAskSuggestionMutation,
} from '@/redux/api/aiSuggestionApi'
import Toggle from '@/components/elements/Toggle'
import { AIType } from './constants'

interface AIAsideProps {
  isOpen: boolean
  event?: any
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export const AIAside = ({ isOpen, setIsOpen }: AIAsideProps) => {
  const [askAI, { isLoading }] = useAskSuggestionMutation()
  const { data: aiHistory } = useAiSuggestionHistoryListQuery()
  const [selectedType, setSelectedType] = useState(0)
  const defaultValues: AISuggestionFormType = {
    prompt: '',
    event: {
      name: '',
      theme: '',
    },
    type: AIType[selectedType].value,
  }

  const methods = useForm<AISuggestionFormType>({
    defaultValues: defaultValues,
  })
  const { control, handleSubmit, setValue, reset } = methods

  const onSubmit: SubmitHandler<AISuggestionFormType> = async (data) => {
    data.type = AIType[selectedType].value
    askAI(data).then((res) => {
      if ('data' in res) {
        reset()
      }
    })
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
      <div className="w-full bg-teal-500 px-4 py-3 text-white font-bold relative">
        <p>Ask AI for suggestions.</p>

        <div
          onClick={() => {
            setIsOpen(false)
          }}
          onKeyDown={() => {
            setIsOpen(false)
          }}
          data-testid="close-ai-aside-button"
          className="cursor-pointer"
        >
          <i className="i-ph-x-bold size-5 absolute top-1 translate-y-1/2 text-white right-4" />
        </div>
      </div>
      <div className="px-4 py-3 flex flex-col gap-3 h-full">
        {aiHistory?.length == 0 && (
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
        )}
        <div
          data-testid="content"
          className="h-full overflow-y-scroll flex flex-col gap-4 pt-4 pb-10"
        >
          {aiHistory?.map(({ id, prompt, output, list, keyword }, idx) => {
            return (
              <div
                key={id}
                id={idx == aiHistory.length - 1 ? 'last' : id}
                className="flex flex-col gap-2"
              >
                <div className="border border-emerald-400 rounded-2xl p-2">
                  {prompt}
                </div>
                <div className="bg-emerald-100 p-2 rounded-2xl">
                  {!!output && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: output.replace(/\n/g, '<br>') ?? '',
                      }}
                    />
                  )}
                  {list?.length > 0 &&
                    list.map((msg, idx) => {
                      return <div key={idx}>{msg}</div>
                    })}
                </div>
                {keyword?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <p>Keywords: </p>

                    {keyword.map((item, idx) => {
                      return (
                        <button
                          onClick={() => {
                            setValue('prompt', item)
                          }}
                          key={idx}
                          className="underline"
                        >
                          {item}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <div className="flex flex-col gap-2 w-full sticky bottom-0 bg-white p-2">
          {isLoading && (
            <div className="text-gray-200">AI is generating answer...</div>
          )}
          <div>
            <Toggle
              options={AIType}
              selectedOption={selectedType}
              setSelectedOption={setSelectedType}
            />
          </div>
          <div className="flex flex-row items-end gap-2">
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
              loading={isLoading}
            >
              Ask AI
            </Button>
          </div>
        </div>
      </div>
    </motion.aside>
  )
}
