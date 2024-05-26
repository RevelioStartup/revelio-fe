import {
  useUpdateTaskStepMutation,
  useDeleteTaskStepMutation,
  useDeleteAllTaskStepsMutation,
} from '@/redux/api/taskStepApi'
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Tooltip,
} from '@mui/material'
import { Button } from '@/components/elements/Button'
import { useState, useEffect } from 'react'
import { Task } from '@/types/taskDetails'
import EditStepDialog from './EditStepDialog'
import ConfirmDeleteDialog from './ConfirmDeleteDialog'
import { CreateTimelineDialog } from './CreateTimelineDialog'
import dayjs from '@/configs/dayjs.config'
import { twMerge } from 'tailwind-merge'
import { formatDateTime } from '@/utils/formatDateTime'

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

export default function StepStepper({ taskId, task }: Props) {
  const [openPrompt, setOpenPrompt] = useState(false)
  const [openTimelineModal, setOpenTimelineModal] = useState(false)
  const [currentTaskStep, setCurrentTaskStep] = useState('')
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')
  const [stepOrder, setStepOrder] = useState(1)
  const [updateTaskStep] = useUpdateTaskStepMutation()
  const [deleteTaskStep] = useDeleteTaskStepMutation()
  const [deleteAllTaskSteps] = useDeleteAllTaskStepsMutation()
  const [openDeleteAllDialog, setOpenDeleteAllDialog] = useState<boolean>(false)

  const steps = task.task_steps
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = (
    id: string,
    name: string,
    description: string,
    status: string,
    step_order: number
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

  const handleDelete = async (stepId: string) => {
    try {
      await deleteTaskStep({ id: stepId }).unwrap()
    } catch (error) {
      console.error('Failed to delete the task step', error)
    }
  }

  const handleOpenDeleteAllDialog = () => setOpenDeleteAllDialog(true)
  const handleCloseDeleteAllDialog = () => setOpenDeleteAllDialog(false)
  const handleConfirmDeleteAll = async () => {
    handleCloseDeleteAllDialog()
    const numericTaskId = Number(taskId)
    if (!isNaN(numericTaskId)) {
      try {
        await deleteAllTaskSteps({ taskId: numericTaskId }).unwrap()
      } catch (error) {
        console.error('Failed to delete all task steps', error)
      }
    } else {
      console.error('Invalid taskId:', taskId)
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
    await updateTaskStep({ id, changes })
  }

  const handleClosePopup = () => {
    setOpenPrompt(false)
  }

  const handleOpenPopup = () => {
    setOpenPrompt(true)
  }

  return (
    <div className="flex flex-col gap-8 px-5 py-3 lg:px-10 lg:py-6 border border-teal-600 rounded-xl">
      <div className="flex items-center gap-3">
        <i className="i-ph-list-checks-light size-6 text-gray-950" />
        <p>
          step {Math.min(activeStep + 1, steps?.length)} out of {steps?.length}
        </p>
        <Button
          variant="primary"
          style={{
            backgroundColor: 'red',
            color: 'white',
            marginLeft: '10px',
            height: '30px',
          }}
          onClick={handleOpenDeleteAllDialog}
        >
          Delete All
        </Button>
      </div>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps?.map((step, index) => (
          <Step
            key={step.name}
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
            <StepLabel>
              <div
                className={twMerge(
                  'flex',
                  step.start_datetime
                    ? 'flex-col items-start justify-start'
                    : 'flex-row items-center gap-1'
                )}
              >
                <p>{step.name}</p>
                {!step.start_datetime && (
                  <Tooltip title="Add to timeline" placement="top">
                    <button
                      className="rounded-full p-1 flex items-start justify-center hover:bg-gray-100"
                      onClick={() => {
                        setOpenTimelineModal(true)
                        setCurrentTaskStep(step.id)
                      }}
                    >
                      <i className="i-ph-calendar-blank size-4 text-blue-800" />
                      <i className="i-ph-plus-bold size-3 -ml-0.5 text-blue-800" />
                    </button>
                  </Tooltip>
                )}
              </div>
            </StepLabel>
            <StepContent>
              <div className="text-sm font-bold flex flex-row items-center gap-2 text-gray-700">
                <i className="i-ph-calendar-blank size-4 text-gray-700" />
                <p>{formatDateTime(step.start_datetime)}</p>
                <p>-</p>
                <p>
                  {dayjs(step.start_datetime).isSame(step.end_datetime, 'day')
                    ? formatDateTime(step.end_datetime, 'HH:mm')
                    : formatDateTime(step.end_datetime)}
                </p>
              </div>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div className="flex flex-row items-center gap-1">
                  <div style={{ paddingRight: '10px' }}>
                    <Button
                      variant="primary"
                      data-testid="button-edit-form"
                      onClick={() => {
                        setId(step.id)
                        setName(step.name)
                        setDescription(step.description)
                        setStatus(step.status)
                        setStepOrder(step.step_order)
                        handleOpenPopup()
                      }}
                    >
                      Edit Step
                    </Button>
                  </div>
                  <div style={{ paddingRight: '10px' }}>
                    <Button
                      variant="primary"
                      onClick={() =>
                        handleNext(
                          step.id,
                          step.name,
                          step.description,
                          'DONE',
                          step.step_order
                        )
                      }
                    >
                      {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                  </div>
                  <div style={{ paddingRight: '10px' }}>
                    <Button
                      variant="primary"
                      data-testid="button-delete"
                      style={{ backgroundColor: 'red', color: 'white' }}
                      onClick={() => handleDelete(step.id)}
                    >
                      Delete
                    </Button>
                  </div>
                  <div style={{ paddingRight: '10px' }}>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      variant="ghost"
                      data-testid={step.id + '-back'}
                    >
                      Back
                    </Button>
                  </div>
                </div>
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
      <EditStepDialog
        openForm={openPrompt}
        onClose={handleClosePopup}
        prevName={name}
        prevDesc={description}
        stepOrder={stepOrder}
        taskId={taskId}
        status={status}
        stepId={id}
      />
      <ConfirmDeleteDialog
        open={openDeleteAllDialog}
        onClose={handleCloseDeleteAllDialog}
        onConfirm={handleConfirmDeleteAll}
      />
      <CreateTimelineDialog
        open={openTimelineModal}
        taskStepId={currentTaskStep}
        onClose={() => {
          setOpenTimelineModal(false)
        }}
      />
    </div>
  )
}
