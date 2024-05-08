export type SubscriptionHistoryResponse = {
  id: number
  plan: {
    id: number
    name: string
    price: number
    duration: number
    event_planner: boolean
    event_tracker: boolean
    event_timeline: boolean
    event_rundown: boolean
    ai_assistant: boolean
  }
  start_date: string
  end_date: string
  user: number
}

export type LatestSubscriptionResponse = {
  id: number
  plan: 'PREMIUM' | 'FREE'
  start_date: string
  end_date: string
  user: number
  is_active: boolean
}
