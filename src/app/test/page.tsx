'use client'
import { Input } from '@/components/elements/Forms/input'
import { Box } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

type TestFormType = {
  name: string
  age: number
}
export default function Test() {
  const defaultValues: TestFormType = {
    name: '',
    age: 1,
  }

  const methods = useForm<TestFormType>({ defaultValues: defaultValues })
  const { control, handleSubmit, reset } = methods

  const onSubmit: SubmitHandler<TestFormType> = async (data) => {
    console.log(data)
  }
  return (
    <Box>
      <form className="flex flex-col gap-3">
        {/* name in here means the field name used in the form type */}
        <Input control={control} name="name" />
        <Input control={control} name="age" />
        <button onClick={handleSubmit(onSubmit)}>Submit</button>
      </form>
    </Box>
  )
}
