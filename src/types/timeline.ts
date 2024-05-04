import { Step } from './taskDetails'

export type Timeline = {
  id: string
  task_step: Step
  start_datetime: string
  end_datetime: string
}

export type CreateTimelineRequest = {
  task_step: string
  start_datetime: string
  end_datetime: string
}

export type ModifyDetailTimelineRequest = {
  id: string
  start_datetime: string
  end_datetime: string
}
