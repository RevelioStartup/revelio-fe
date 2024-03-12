'use client'
import { Checkbox } from '@/components/elements/Forms/checkbox'
import { Input } from '@/components/elements/Forms/input'
import { Select } from '@/components/elements/Forms/select'
import { TextArea } from '@/components/elements/Forms/textarea'
import { Box } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AIButton } from '../plans/AISuggestion/AIButton'

type TestFormType = {
  name: string
  age: number
  description: string
  fruits: string[]
  color: string
}
export default function Test() {
  const defaultValues: TestFormType = {
    name: '',
    age: 1,
    description: '',
    fruits: [],
    color: '',
  }

  const methods = useForm<TestFormType>({ defaultValues: defaultValues })
  const { control, handleSubmit, reset, setValue } = methods

  const onSubmit: SubmitHandler<TestFormType> = async (data) => {
    console.log(data)
  }
  return (
    <Box>
      <form className="flex flex-col gap-3">
        {/* name in here means the field name used in the form type */}
        <Input control={control} name="name" rules={{}} />
        <Input control={control} name="age" />
        <TextArea control={control} name="description" rows={5} />
        <Checkbox
          label="Select your favorite fruits"
          name="fruits"
          control={control}
          options={[
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
            { label: 'Orange', value: 'orange' },
            { label: 'Grapes', value: 'grapes' },
          ]}
          setValue={setValue}
          required
        />
        <Select
          label="Select your favorite color"
          name="color"
          options={[
            { label: 'Red', value: 'red' },
            { label: 'Blue', value: 'blue' },
            { label: 'Green', value: 'green' },
          ]}
          placeholder="Choose one"
          control={control}
          required
        />
        <button onClick={handleSubmit(onSubmit)}>Submit</button>
      </form>
      <AIButton />
    </Box>
  )
}
