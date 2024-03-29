export type Step = {
  id: string
  name: string
  description: string
  status: string
  step_order: number
  task: string
}

export type Task = {
  id: string
  task_steps: Step[]
  title: string
  description: string
  status: string
  event: string
}
