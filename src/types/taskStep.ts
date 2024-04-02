export type Steps = {
  name: string
  description: string
}
export type StepsDetail = Steps & {
  id: string
  status: string
  step_order: number
  task: number
}
export type CreateTaskStepRequest = {
  task_id: number
  steps: Steps[]
}
export type CreateTaskAIStepResponse = {
  task_id: number
  steps: Steps[]
}

export type CreateTaskStepResponse = StepsDetail[]

export type EditTaskStepRequest = {
  name: string
  description: string
  status: string
  step_order: number
  task: string
}
