import { PackageDetailResponse } from './package'

export type SubscriptionHistoryResponse = {
  id: number
  plan: PackageDetailResponse
  start_date: string
  end_date: string
  user: number
}

export type LatestSubscriptionResponse = {
  id: number
  plan: PackageDetailResponse
  start_date: string
  end_date: string
  user: number
  is_active: boolean
}
