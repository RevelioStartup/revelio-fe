'use client'

import { useGetTaskDetailQuery } from '@/redux/api/taskApi'
import { useGetEventQuery } from '@/redux/api/eventApi'
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
} from '@mui/material'
import Link from 'next/link'
import { Button } from '@/components/elements/Button'
import { useState, useEffect } from 'react'

export default function TaskDetailPage({
  params,
}: Readonly<{
  params: Readonly<{ eventId: string; taskId: string }>
}>) {
  const { data: taskData, isLoading } = useGetTaskDetailQuery(params)
  const { data: eventData } = useGetEventQuery(params.eventId)

  const steps = taskData?.task_steps

  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  useEffect(() => {
    if (!isLoading && steps) {
      const finishedSteps = steps.filter(
        (step) => step.status === 'DONE'
      ).length
      setActiveStep(finishedSteps)
    }
  }, [isLoading, steps])

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
        <Box >
          {steps?.length === 0 ? (
            <div className="mt-2 space-y-2 sm:mt-4 sm:space-y-4">
              <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography variant="h5">No steps created yet</Typography>
                <Link href={``}>
                  <Button>Generate Manually</Button>
                </Link>
                <Typography>or</Typography>
                <Link href={``}>
                  <Button>Generate using AI</Button>
                </Link>
              </Paper>
            </div>
          ) : (
            <div>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps?.map((step, index) => (
                  <Step key={step.name}>
                    <StepLabel>{step.name}</StepLabel>
                    <StepContent>
                      <Typography>{step.description}</Typography>
                      <Box sx={{ mb: 2 }}>
                        <table className="table border-separate border-spacing-y-1">
                          <tbody>
                            <tr className="table-row">
                              <td style={{ paddingRight: '10px' }}>
                                {' '}
                                <Button variant="primary" onClick={handleNext}>
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
                                  data-testid={step.name}
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
              </Stepper>
              {activeStep === steps?.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                  <Typography>
                    All steps completed - you have finished this task
                  </Typography>
                  <Button onClick={handleReset}>Reset</Button>
                </Paper>
              )}
            </div>
          )}
        </Box>
        <Link href={``}>
          <Button>Save</Button>
        </Link>
        <Link href={`/event/${eventData?.id}`}>
          <Button variant="ghost">Back to Event Page</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[90vh]">
      <div data-testid="loader" className="loader"></div>
    </div>
  )
}
