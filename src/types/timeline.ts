import { StepsDetail } from './taskStep'

export type Timeline = {
  id: string
  task_step: StepsDetail
  start_datetime: string
  end_datetime: string
}
