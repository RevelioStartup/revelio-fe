'use client'

import { useGetTransactionListQuery } from '@/redux/api/paymentApi'
import { formatRupiah } from '@/utils/formatRupiah'
import { twMerge } from 'tailwind-merge'
import { HoverRowVariants, StatusVariants } from './constant'
import { TransactionStatus } from '@/types/payment'
import { getTransactionStatus } from '@/utils/getTransactionStatus'
import { formatDateTime } from '@/utils/formatDateTime'

interface TransactionHistoryI {
  status?: string
}

export const TransactionHistory = ({ status }: TransactionHistoryI) => {
  const { data, isLoading } = useGetTransactionListQuery()

  return (
    <div className="my-2 px-4">
      <p className="py-4 text-3xl font-bold">Transaction History</p>
      {isLoading ? (
        <div data-testid="loader" className="loader"></div>
      ) : (
        <div className="overflow-x-scroll w-screen md:w-11/12 px-4 lg:px-0">
          <table className="w-full border-collapse table rounded-lg overflow-hidden border-teal-600">
            <thead className="table-header-group sticky top-0">
              <tr className="border table-row text-xl">
                <th className="p-2 border-2 border-teal-600 text-left table-cell">
                  Checkout Time
                </th>
                <th className="p-2 border-2 border-teal-600 text-left table-cell">
                  Package Plan
                </th>
                <th className="p-2 border-2 border-teal-600 text-left table-cell">
                  Price
                </th>
                <th className="p-2 border-2 border-teal-600 text-left table-cell">
                  Expiry Time
                </th>
                <th className="p-2 border-2 border-teal-600 text-left table-cell">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="table-row-group">
              {data && data?.length > 0 ? (
                data
                  ?.filter((transaction) => {
                    if (status) return transaction.status === status
                    return transaction
                  })
                  .map(
                    ({
                      checkout_time,
                      expiry_time,
                      package: { name },
                      price,
                      id,
                      status,
                      midtrans_url,
                    }) => (
                      <tr
                        key={id}
                        className={twMerge(
                          'border table-row text-lg group',
                          HoverRowVariants({
                            hover: getTransactionStatus(
                              status as TransactionStatus
                            ),
                          })
                        )}
                      >
                        <td className="p-2 border-2 border-teal-600">
                          {formatDateTime(checkout_time)}
                        </td>

                        <td className="p-2 border-2 border-teal-600">{name}</td>
                        <td className="p-2 border-2 border-teal-600">
                          {formatRupiah(price)}
                        </td>
                        <td className="p-2 border-2 border-teal-600">
                          {formatDateTime(expiry_time)}
                        </td>
                        <td
                          className={twMerge(
                            'p-2 border-2 border-teal-600',
                            StatusVariants({
                              variant: getTransactionStatus(
                                status as TransactionStatus
                              ),
                            })
                          )}
                        >
                          <button
                            onClick={() => {
                              if (midtrans_url) {
                                window.open(midtrans_url)
                              }
                            }}
                            className={twMerge(
                              'flex flex-row items-center gap-1',
                              midtrans_url &&
                                'hover:underline hover:underline-offset-1'
                            )}
                          >
                            <p>{status.toUpperCase()}</p>
                            {!!midtrans_url && (
                              <i className="i-ph-arrow-square-up-right-light size-5" />
                            )}
                          </button>
                        </td>
                      </tr>
                    )
                  )
              ) : (
                <td
                  colSpan={5}
                  className="border-2 border-teal-600 p-2 w-full text-gray-600 text-center"
                >
                  No transactions recorded
                </td>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
