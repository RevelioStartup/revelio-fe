'use client'

import { EventName } from './EventName'
import { EventDate } from './EventDate'
import { useEventContext } from '@/components/contexts/EventContext'
import { EventBudget } from './EventBudget'
import { EventPurpose } from './EventPurpose'
import { RootState, useAppSelector } from "@/redux/store";
import { useEffect } from 'react'

export default function EventPage() {
  const { page } = useEventContext()

  const { token } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!token) {
      window.location.assign('/')
    }
  })

  switch (page) {
    case 'name':
      return <EventName />
    case 'date':
      return <EventDate />
    case 'budget':
      return <EventBudget />
    case 'purpose':
      return <EventPurpose />
    default:
      return <EventName />
  }
}
