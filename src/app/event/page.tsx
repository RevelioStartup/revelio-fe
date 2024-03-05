'use client'

import { EventName } from './(event)/EventName'
import { EventDate } from './(event)/EventDate'
import { useEventContext } from '@/components/contexts/EventContext'

export default function EventPage() {
  const { page } = useEventContext()

  switch (page) {
    case 'name':
      return <EventName />
    case 'date':
      return <EventDate />
    default:
      return <EventName />
  }
}
