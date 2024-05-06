export type SubscriptionHistoryResponse = {
  id: number
  plan: 'PREMIUM' | 'FREE'
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