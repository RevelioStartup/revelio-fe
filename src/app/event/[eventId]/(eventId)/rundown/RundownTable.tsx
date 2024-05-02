import { useGetEventRundownQuery } from '@/redux/api/rundownApi'
import { CreateRundownButton } from './CreateRundownButton'
import React from 'react'

interface RundownTableProps {
  eventId: string
}

export const RundownTable = ({ eventId }: RundownTableProps) => {
  const { data: eventRundown = [] } = useGetEventRundownQuery(eventId)
  return (
    <div className="overflow-x-auto mt-2 mb-4">
      {eventRundown.length == 0 ? (
        <CreateRundownButton data-testid="create-rundown-button" />
      ) : (
        <table
          data-testid="rundown-table"
          className="w-full table-auto rounded-lg overflow-hidden"
        >
          <thead>
            <tr className="bg-teal-500 text-teal-50">
              <th className="border px-4 py-2">Start Time</th>
              <th className="border px-4 py-2">End Time</th>
              <th className="border px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {eventRundown.map((rundown) => (
              <tr key={rundown.id}>
                <td className="border px-4 py-2">{rundown.start_time}</td>
                <td className="border px-4 py-2">{rundown.end_time}</td>
                <td className="border px-4 py-2">{rundown.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default RundownTable
