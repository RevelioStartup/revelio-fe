'use client'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'
import { useGetPackageDetailQuery } from '@/redux/api/packageApi'
import PackageCard from './PackageCard'
import { PackageDetailResponse } from '@/types/package'
import { capitalizeWords } from '@/utils/capitalizeWords'
import { useGetLatestSubscriptionQuery } from '@/redux/api/subscriptionApi'
import { LatestSubscriptionResponse } from '@/types/subscription'
import { formatRupiah } from '@/utils/formatRupiah'
import { formatDate } from '@/utils/formatDate'
import { PACKAGE } from './constant'
import { useCreateTransactionMutation } from '@/redux/api/paymentApi'
import { Button } from '@/components/elements/Button'
import { useEffect } from 'react'

export default function PackageList() {
  const {
    data: free_package = {} as PackageDetailResponse,
    isLoading: isLoadingFreePackage,
  } = useGetPackageDetailQuery(PACKAGE['free'])

  const {
    data: premium_package = {} as PackageDetailResponse,
    isLoading: isLoadingPremiumPackage,
  } = useGetPackageDetailQuery(PACKAGE['premium'])

  const {
    data: latest_subscription = {} as LatestSubscriptionResponse,
    isLoading: isLoadingLatestSubscription,
  } = useGetLatestSubscriptionQuery()

  const [createTransaction, { data, isLoading: isLoadingCreateTransaction }] =
    useCreateTransactionMutation()

  const handleCreateTransaction = async () => {
    createTransaction({ package_id: premium_package.id })
  }
  const features: (keyof PackageDetailResponse)[] = [
    'event_planner',
    'event_tracker',
    'event_timeline',
    'event_rundown',
    'ai_assistant',
  ]
  useEffect(() => {
    if (data) {
      window.open(data.redirect_url)
    }
  }, [data])

  return isLoadingFreePackage ||
    isLoadingPremiumPackage ||
    isLoadingLatestSubscription ||
    !free_package ||
    !premium_package ||
    !latest_subscription ? (
    <Loader />
  ) : (
    <Box data-testid="package-detail" className="m-2 flex flex-col">
      <Box className="flex flex-col items-center justify-center">
        <p className="text-4xl font-bold mt-4">Revelio</p>
        <p className="text-lg text-teal-500 mt-2 mb-4">Upgrade your plan</p>
      </Box>

      <Box className="items-center justify-center flex my-4">
        <Box className="my-8 border-teal-400 border-t-2 border-l-2 border-b-2 p-4 rounded-tl-3xl rounded-bl-3xl overflow-hidden w-72">
          <Box className="h-56 mx-4 my-2 space-y-2">
            <h2 className="text-lg font-bold">Free</h2>
            <p className="text-sm">Try it as long as you like</p>
            {free_package && <PackageCard package_detail={free_package} />}
          </Box>
        </Box>

        <Box className="bg-teal-600 text-white p-6 rounded-3xl relative min-w-64 w-1/3">
          <span className="absolute top-0 right-0 bg-teal-100 rounded-2xl text-xs m-4 p-2 text-teal-600 font-bold">
            RECOMMENDED
          </span>
          <Box className="mx-4 my-8 space-y-3">
            <h2 className="text-3xl font-bold">Premium</h2>
            <p className="text-sm font-bold text-teal-100">
              Limitless possibilities
            </p>
            {premium_package && (
              <PackageCard package_detail={premium_package} />
            )}
          </Box>
        </Box>
      </Box>

      <Box className="my-16 w-full flex justify-center">
        <TableContainer component={Box} style={{ width: '75%' }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="center">
                  <h3 className="font-bold">Free</h3>
                </TableCell>
                <TableCell align="center">
                  <h3 className="font-bold">Premium</h3>
                </TableCell>
              </TableRow>
              {features.map((feature, index) => (
                <TableRow
                  key={feature}
                  style={{
                    backgroundColor:
                      index % 2 === 0 ? 'rgba(0,0,0,0.05)' : 'transparent',
                  }}
                >
                  <TableCell>
                    <p className="font-bold">{capitalizeWords(feature)}</p>
                  </TableCell>
                  <TableCell align="center">
                    {free_package[feature] ? (
                      <i className="i-ph-check-circle-fill text-teal-600 size-6" />
                    ) : (
                      <i className="i-ph-x-circle-fill text-rose-500 size-6" />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {premium_package[feature] ? (
                      <i className="i-ph-check-circle-fill text-teal-600 size-6" />
                    ) : (
                      <i className="i-ph-x-circle-fill text-rose-500 size-6" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3}>
                  <div className="w-full flex flex-row items-end justify-end pr-12">
                    {!latest_subscription.is_active ? (
                      <Button
                        data-testid="choose-plan-button"
                        onClick={handleCreateTransaction}
                        loading={isLoadingCreateTransaction}
                        className="bg-white text-teal-600 border border-teal-600 rounded-2xl py-4 px-6 text-sm"
                      >
                        Choose Plan ({formatRupiah(premium_package.price)})
                      </Button>
                    ) : (
                      <p
                        data-testid="subscribed-plan"
                        className="text-teal-600"
                      >
                        Subscribed until{' '}
                        {formatDate(latest_subscription.end_date)}
                      </p>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

function Loader() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[90vh]">
      <div data-testid="loader" className="loader"></div>
    </div>
  )
}
