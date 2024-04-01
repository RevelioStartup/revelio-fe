export type CreateTaskStepRequest = {
  task_id: number
  steps: { name: string; description: string }[]
}

export type EditTaskStepRequest = {
  name: string,
  description: string,
  status: string,
  step_order: number,
  task: string
}
