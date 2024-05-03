export type Step = {
  id: string
  name: string
  description: string
  status: string
  step_order: number
  task: string
  start_datetime: string | null
  end_datetime: string | null
}

export type Task = {
  id: string
  task_steps: Step[]
  title: string
  description: string
  status: string
  event: string
}
