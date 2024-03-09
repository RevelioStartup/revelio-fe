'use client'

import { EventName } from './(event)/EventName'
import { EventDate } from './(event)/EventDate'
import { useEventContext } from '@/components/contexts/EventContext'
import { EventBudget } from './(event)/EventBudget'
import { EventPurpose } from './(event)/EventPurpose'

export default function EventPage() {
  const { page } = useEventContext()

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
