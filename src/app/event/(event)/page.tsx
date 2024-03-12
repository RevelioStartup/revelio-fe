'use client'

import { EventName } from './EventName'
import { EventDate } from './EventDate'
import { useEventContext } from '@/components/contexts/EventContext'
import { EventBudget } from './EventBudget'
import { EventPurpose } from './EventPurpose'

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
