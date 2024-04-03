'use client'

import { useEventContext } from '@/components/contexts/EventContext'
import { EventPurpose } from './EventPurpose'
import { RootState, useAppSelector } from '@/redux/store'
import { useEffect } from 'react'
import { EventPlanner } from './EventPlanner'

export default function EventPage() {
  const { page } = useEventContext()

  const { token } = useAppSelector((state: RootState) => state.user)

  useEffect(() => {
    if (!token) {
      window.location.assign('/')
    }
  })

  switch (page) {
    case 'planner':
      return <EventPlanner />
    case 'purpose':
      return <EventPurpose />
    default:
      return <EventPlanner />
  }
}
