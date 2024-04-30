export type SubscriptionHistoryResponse = {
    id: number
    plan: "PREMIUM" | "FREE"       
    start_date: string
    end_date: string
    user: number
}