export type Task = {
  id: number
  title: string
  description: string
  status: string
  event: string
}

export type TaskListRequest = string
export type TaskListResponse = Task[]
export type CreateTaskRequest = Omit<Task, 'id'>
export type CreateTaskResponse = Task
export type UpdateTaskRequest = {
  id: number
  title: string
  description: string
  event: string
}
export type TaskDetailRequest = {
  id: number
}
export type TaskDetailResponse = Task
