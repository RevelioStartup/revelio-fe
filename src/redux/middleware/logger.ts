'use client'
import type { Middleware, MiddlewareAPI } from '@reduxjs/toolkit'
import { isRejectedWithValue } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import { logout } from '../features/userSlice'

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action: any) => {
    if (isRejectedWithValue(action)) {
      if (action.meta.arg.endpointName == 'getProfile') {
        return
      } else if (
        action?.payload.status == 401 &&
        action.meta.arg.endpointName != 'forgotPassword'
      ) {
        api.dispatch(logout())
      } else {
        const errorData =
          action.payload.data?.error ||
          action.payload.data?.message ||
          action.error.message
        if (action.meta.arg.endpointName == 'createTimeline') {
          toast.error(errorData)
        } else if (action.meta.arg.endpointName === 'modifyDetailTimeline') {
          toast.error(errorData)
        }
      }
    }
    return next(action)
  }
