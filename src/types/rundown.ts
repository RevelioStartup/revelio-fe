export type Rundowns = {
    description: string
    start_time: string
    end_time: string
}
export type RundownsDetail = Rundowns & {
    id: string
    rundown_order: number
    event: string
}
export type CreateRundownsRequest = {
    event_id: string
    rundown_data: Rundowns[]
}
  
export type CreateRundownsResponse = RundownsDetail[]
  