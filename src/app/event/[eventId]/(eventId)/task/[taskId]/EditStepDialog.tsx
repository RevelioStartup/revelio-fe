'use client'

import { useUpdateTaskStepMutation } from '@/redux/api/taskStepApi'
import { TextArea } from '@/components/elements/Forms/textarea'
import {
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@mui/material'
import { Button } from '@/components/elements/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { StepUpdateRequest } from './StepStepper'

type UpdateStepFormType = {
    name: string
    description: string
}

interface Props {
    readonly openForm: boolean
    readonly onClose: () => void
    readonly prevName: string
    readonly prevDesc: string
    readonly stepOrder: number
    readonly taskId: string
    readonly status: string
    readonly stepId: string
}

export default function EditStepDialog({
    openForm,
    onClose,
    prevName,
    prevDesc,
    stepOrder,
    taskId,
    status,
    stepId
  }: Props){
    
    const defaultValues: UpdateStepFormType = {
        name: prevName,
        description: prevDesc,
    }

    const [updateTaskStep] = useUpdateTaskStepMutation()

    const methods = useForm<UpdateStepFormType>({ defaultValues: defaultValues })
    const { control, handleSubmit, reset } = methods

    const editTaskStep = async (id: string, changes: StepUpdateRequest) => {
        await updateTaskStep({ id, changes }).then((res) => {})
    }
    
    const onSubmit: SubmitHandler<UpdateStepFormType> = async (data) => {
    const name = data.name
    const description = data.description
    const step_order = stepOrder
    editTaskStep(stepId, { name, description, status, step_order, task: taskId })
    onClose()
    reset()
    }

    return (
        <Box>
            <Dialog
            open={openForm}
            onClose={onClose}
            data-testid="login-dialog-recover"
            fullWidth={true}
            maxWidth='md'
            style={{  padding: '50px', borderRadius: '20px 20px 0 0', minHeight: '50px' }}
            >
            <DialogTitle style={{ textAlign: 'center', fontSize: '24px' , marginTop: '20px'}}>Edit Step</DialogTitle>
            <DialogActions style={{ padding: '20px', borderRadius: 'inherit', margin: '20px'}}>
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
                    onClick={onClose}
                >
                    Close
                </Button>
                </div>
            </DialogActions>
            </Dialog>
        </Box>
    )
}