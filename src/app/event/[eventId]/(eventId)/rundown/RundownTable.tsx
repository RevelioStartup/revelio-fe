import { useGetEventRundownQuery } from '@/redux/api/rundownApi'
import { CreateRundownButton } from './CreateRundownButton'
import { Button } from '@/components/elements/Button'
import React, { useState, useEffect } from 'react'
import EditRundownDialog from './EditRundownDialog'

interface RundownTableProps {
  eventId: string
}

export const RundownTable = ({ eventId }: RundownTableProps) => {
  const { data: eventRundown = [] } = useGetEventRundownQuery(eventId)
  const [openPrompt, setOpenPrompt] = useState(false)
  const [description, setDescription] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [rundownId, setRundownId] = useState('')

  const handleClosePopup = () => {
    setOpenPrompt(false)
  }

  const handleOpenPopup = () => {
    setOpenPrompt(true)
  }

  return (
    <div className="overflow-x-auto mt-2 mb-4">
      {eventRundown.length == 0 ? (
        <CreateRundownButton data-testid="create-rundown-button" />
      ) : (
        <div>
          <table
            data-testid="rundown-table"
            className="w-full table-auto rounded-lg overflow-hidden"
          >
            <thead>
              <tr className="bg-teal-500 text-teal-50">
                <th className="border px-4 py-2">Start Time</th>
                <th className="border px-4 py-2">End Time</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Modify</th>
              </tr>
            </thead>
            <tbody>
              {eventRundown.map((rundown) => (
                <tr key={rundown.id}>
                  <td className="border px-4 py-2">{rundown.start_time}</td>
                  <td className="border px-4 py-2">{rundown.end_time}</td>
                  <td className="border px-4 py-2">{rundown.description}</td>
                  <td className="border px-4 py-2">
                    <Button
                      variant="primary"
                      data-testid={`rundown-${rundown.rundown_order}-edit`}
                      onClick={() => {
                        setRundownId(rundown.id)
                        setDescription(rundown.description)
                        setStartTime(rundown.start_time)
                        setEndTime(rundown.end_time)
                        handleOpenPopup()
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <EditRundownDialog
            openForm={openPrompt}
            onClose={handleClosePopup}
            prevDesc={description}
            prevStartTime={startTime}
            prevEndTime={endTime}
            rundownId={rundownId}
          />
        </div>
      )}
    </div>
  )
}

export default RundownTable
