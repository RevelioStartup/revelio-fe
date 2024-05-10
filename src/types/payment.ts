import { PackageDetailResponse } from './package'

export type Transaction = {
  id: string
  midtrans_url: string | null
  midtrans_transaction_id: string
  order_id: string
  price: number
  checkout_time: string
  expiry_time: string
  payment_type: string
  payment_merchant: string
  status: string
  package: PackageDetailResponse
}

export type GetTransactionResponse = { transaction_detail: Transaction }
