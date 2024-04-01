import { useUpdateTaskStepMutation } from '@/redux/api/taskStepApi'
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
} from '@mui/material'
import { Button } from '@/components/elements/Button'
import { useState, useEffect } from 'react'
import { Task } from '@/types/taskDetails'
import EditStepDialog from './EditStepDialog'

export type StepUpdateRequest = {
    name: string
    description: string
    status: string
    step_order: number
    task: string
}
  

interface Props {
    readonly taskId: string
    readonly task: Task
  }

export default function StepStepper({
    taskId,
    task
  }: Props) {
  const [openPrompt, setOpenPrompt] = useState(false)
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')
  const [stepOrder, setStepOrder] = useState(1)
  const [updateTaskStep] = useUpdateTaskStepMutation()

  const steps = task.task_steps
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = (
    id: string,
    name: string,
    description: string,
    status: string,
    step_order: number,
  ) => {
    editTaskStep(id, { name, description, status, step_order, task: taskId })
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    const prev = steps[activeStep - 1]
    if (prev) {
      editTaskStep(prev.id, {
        name: prev.name,
        description: prev.description,
        status: 'NOT_STARTED',
        step_order: prev.step_order,
        task: taskId,
      })
      setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }
  }

  useEffect(() => {
    if (steps) {
      const finishedSteps = steps.filter(
        (step) => step.status === 'DONE'
      ).length
      setActiveStep(finishedSteps)
    }
  }, [steps])

  const editTaskStep = async (id: string, changes: StepUpdateRequest) => {
    await updateTaskStep({ id, changes }).then((res) => {})
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
  ) => {
    setId(id)
    setName(name)
    setDescription(description)
    setStatus(status)
    setStepOrder(step_order)
    setOpenPrompt(true)
  }

  return(
    <div className="flex flex-col gap-8 px-5 py-3 lg:px-10 lg:py-6 border border-teal-600 rounded-xl">
        <div className="flex flex-row gap-3">
        <i className="i-ph-list-checks-light size-6 text-gray-950" />
            <p>step {Math.min(activeStep+1, steps?.length)} out of {steps?.length}</p>
        </div>
        <Stepper activeStep={activeStep} orientation="vertical">
            {steps?.map((step, index) => (
            <Step key={step.name}
                sx={{
                '& .MuiStepLabel-root .Mui-completed': {
                    color: '#2dd4bf',
                },
                '& .MuiStepLabel-root .Mui-active': {
                    color: '#fbbf24',
                },
                '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                    {
                    color: 'black',
                    },
                '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                    fill: 'black',
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
        <EditStepDialog openForm={openPrompt} 
        onClose={handleClosePopup}
        prevName = {name}
        prevDesc={description}
        stepOrder={stepOrder}
        taskId = {taskId}
        status = {status}
        stepId = {id}
        />
    </div>
  )
}