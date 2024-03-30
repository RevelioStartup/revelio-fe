export type CreateTaskStepRequest = {
  task_id: number
  steps: { name: string; description: string }[]
}
