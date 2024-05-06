export type PackageDetailResponse = {
    id: number
    name: string
    price: number
    event_planner: boolean
    event_tracker: boolean
    event_timeline: boolean
    event_rundown: boolean
    ai_assistant: boolean
}

export type PackageDetailRequest = {
    id: number
}