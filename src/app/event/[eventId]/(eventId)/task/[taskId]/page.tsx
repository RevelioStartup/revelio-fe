'use client'

import { useGetTaskDetailQuery } from '@/redux/api/taskApi'
import { useGetEventQuery } from '@/redux/api/eventApi'
import { useUpdateTaskStepMutation } from '@/redux/api/taskStepApi'
import { Input } from '@/components/elements/Forms/input'
import { TextArea } from '@/components/elements/Forms/textarea'
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@mui/material'
import Link from 'next/link'
import { Button } from '@/components/elements/Button'
import { useState, useEffect } from 'react'
import { AddTaskStepsButton } from '../step/AddTaskStepsButton'
import { SubmitHandler, useForm } from 'react-hook-form'

type StepUpdateRequest = {
  name: string
  description: string
  status: string
  step_order: number
  task: string
}

type UpdateStepFormType = {
  name: string
  description: string
}

export default function TaskDetailPage({
  params,
}: Readonly<{
  params: Readonly<{ eventId: string; taskId: string }>
}>) {
  const { data: taskData, isLoading } = useGetTaskDetailQuery(params)
  const [openPrompt, setOpenPrompt] = useState(false)
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')
  const [stepOrder, setStepOrder] = useState(1)
  const [task, setTask] = useState('')
  const { data: eventData } = useGetEventQuery(params.eventId)
  const [updateTaskStep] = useUpdateTaskStepMutation()
  const defaultValues: UpdateStepFormType = {
    name: name,
    description: description,
  }
  const methods = useForm<UpdateStepFormType>({ defaultValues: defaultValues })
  const { control, handleSubmit, reset } = methods

  const steps = taskData?.task_steps
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = (
    id: string,
    name: string,
    description: string,
    status: string,
    step_order: number,
    task: string
  ) => {
    editTaskStep(id, { name, description, status, step_order, task })
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    const prev = steps![activeStep - 1]
    if (prev) {
      editTaskStep(prev.id, {
        name: prev.name,
        description: prev.description,
        status: 'NOT_STARTED',
        step_order: prev.step_order,
        task: prev.task,
      })
      setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }
  }

  useEffect(() => {
    if (!isLoading && steps) {
      const finishedSteps = steps.filter(
        (step) => step.status === 'DONE'
      ).length
      setActiveStep(finishedSteps)
    }
  }, [isLoading, steps])

  const editTaskStep = async (id: string, changes: StepUpdateRequest) => {
    await updateTaskStep({ id, changes }).then((res) => {})
  }

  const onSubmit: SubmitHandler<UpdateStepFormType> = async (data) => {
    const name = data.name
    const description = data.description
    const step_order = stepOrder
    editTaskStep(id, { name, description, status, step_order, task })
    setOpenPrompt(false)
    reset()
  }

  const handleClosePopup = () => {
    setOpenPrompt(false)
  }

  const handleOpenPopup = (
    id: string,
    name: string,
    description: string,
    status: string,
    step_order: number,
    task: string
  ) => {
    setId(id)
    setName(name)
    setDescription(description)
    setStatus(status)
    setStepOrder(step_order)
    setTask(task)
    setOpenPrompt(true)
  }

  if (!isLoading && taskData?.task_steps) {
    return (
      <div className="flex flex-col gap-y-4">
        <h1 className="font-bold text-3xl text-neutral-900 capitalize">
          {' '}
          {eventData?.name}{' '}
        </h1>
        <span className="border-t-2 border-teal-600"> </span>
        <h2 className="font-bold text-3xl text-teal-600 capitalize">
          {' '}
          {taskData?.title}{' '}
        </h2>
        <table className="table w-full max-w-xl border-separate border-spacing-y-5">
          <tbody>
            <tr className="table-row">
              <td className="text-teal-800 font-bold text-left"> Date </td>
              <td className="font-medium text-left"> {eventData?.date} </td>
            </tr>
            <tr className="table-row">
              <td className="text-teal-800 font-bold text-left">
                {' '}
                Description{' '}
              </td>
              <td className="font-medium text-left">
                {' '}
                {taskData?.description}{' '}
              </td>
            </tr>
            <tr className="table-row">
              <td className="text-teal-800 font-bold text-left"> Status </td>
              <td className="font-medium text-left"> {taskData?.status} </td>
            </tr>
          </tbody>
        </table>
        <Box>
          {steps?.length === 0 ? (
            <AddTaskStepsButton />
          ) : (
            <div className="flex flex-col gap-8 px-5 py-3 lg:px-10 lg:py-6 border border-teal-600 rounded-xl">
              <div className="flex flex-row gap-3">
                <i className="i-ph-list-checks-light size-6 text-gray-950" />
                    <p>Step {activeStep} out of {steps?.length}</p>
              </div>
                <Stepper activeStep={activeStep} orientation="vertical">
                  {steps?.map((step, index) => (
                    <Step key={step.name}
                      sx={{
                        '& .MuiStepLabel-root .Mui-completed': {
                          color: '#2dd4bf', // circle color (COMPLETED)
                        },
                        '& .MuiStepLabel-root .Mui-active': {
                          color: '#fbbf24', // circle color (ACTIVE)
                        },
                        '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                          {
                            color: 'black', // Just text label (ACTIVE)
                          },
                        '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                          fill: 'black', // circle's number (ACTIVE)
                        },
                      }}
                    >
                      <StepLabel>{step.name}</StepLabel>
                      <StepContent>
                        <Typography>{step.description}</Typography>
                        <Box sx={{ mb: 2 }}>
                          <table className="table border-separate border-spacing-y-1">
                            <tbody>
                              <tr className="table-row">
                                <td style={{ paddingRight: '10px' }}>
                                  {' '}
                                  <Button
                                    variant="primary"
                                    data-testid="button-edit-form"
                                    onClick={() =>
                                      handleOpenPopup(
                                        step.id,
                                        step.name,
                                        step.description,
                                        step.status,
                                        step.step_order,
                                        step.task
                                      )
                                    }
                                  >
                                    Edit Step
                                  </Button>{' '}
                                </td>
                                <td style={{ paddingRight: '10px' }}>
                                  {' '}
                                  <Button
                                    variant="primary"
                                    onClick={() =>
                                      handleNext(
                                        step.id,
                                        step.name,
                                        step.description,
                                        'DONE',
                                        step.step_order,
                                        step.task
                                      )
                                    }
                                  >
                                    {index === steps.length - 1
                                      ? 'Finish'
                                      : 'Continue'}
                                  </Button>{' '}
                                </td>
                                <td style={{ paddingRight: '10px' }}>
                                  {' '}
                                  <Button
                                    disabled={index === 0}
                                    onClick={handleBack}
                                    variant="ghost"
                                    data-testid={step.id + '-back'}
                                  >
                                    Back
                                  </Button>{' '}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </Box>
                      </StepContent>
                    </Step>
                  ))}
                  {activeStep === steps?.length && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                      <Typography>
                        All steps completed - you have finished this task
                      </Typography>
                    </Paper>
                  )}
                </Stepper>
            </div>
          )}
        </Box>
        <Link href={`/event/${eventData?.id}`}>
          <Button variant="ghost">Back to Event Page</Button>
        </Link>
        <Box>
          <Dialog
            open={openPrompt}
            onClose={handleClosePopup}
            data-testid="login-dialog-recover"
          >
            <DialogTitle>Edit Step</DialogTitle>
            <DialogActions>
              <div className="flex flex-col gap-3" style={{ flex: 1 }}>
                <form
                  className="flex flex-col gap-3"
                  onSubmit={handleSubmit(onSubmit)}
                  data-testid="recover-account-form"
                >
                  <TextArea
                    control={control}
                    name="name"
                    required
                    placeholder="Enter Step Name"
                    data-testid="name-input"
                  />
                  <TextArea
                    control={control}
                    name="description"
                    required
                    placeholder="Enter Step Description"
                    data-testid="description-input"
                  />
                  <Button type="submit" data-testid="button-submit">
                    Edit Step
                  </Button>
                </form>
                <Button
                  variant={'secondary'}
                  data-testid="close-form"
                  onClick={handleClosePopup}
                >
                  Close
                </Button>
              </div>
            </DialogActions>
          </Dialog>
        </Box>
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[90vh]">
      <div data-testid="loader" className="loader"></div>
    </div>
  )
}
