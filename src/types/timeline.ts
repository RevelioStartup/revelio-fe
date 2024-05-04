import { Steps } from './taskStep'

export type Timeline = {
  id: string
  start_datetime: string
  end_datetime: string
  task_step: Steps
}
export type ModifyDetailTimelineRequest = {
  id: string
  start_datetime: string
  end_datetime: string
}
