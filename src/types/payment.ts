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

export type TransactionSuccess = 'authorize' | 'capture' | 'settlement'
export type TransactionPending = 'pending' | 'chargeback' | 'partial_chargeback'
export type TransactionError =
  | 'deny'
  | 'cancel'
  | 'refund'
  | 'partial_refund'
  | 'expire'
  | 'failure'
export const transactionErrorStatuses = [
  'deny',
  'cancel',
  'refund',
  'partial_refund',
  'expire',
  'failure',
]

export type TransactionStatus = TransactionSuccess &
  TransactionPending &
  TransactionError

export type MidtransErrorResponse = {
  error: string
}
