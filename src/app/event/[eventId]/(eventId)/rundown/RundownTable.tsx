import {
  useGetEventRundownQuery,
  useDeleteRundownMutation,
  useDeleteAllRundownMutation,
} from '@/redux/api/rundownApi'
import { CreateRundownButton } from './CreateRundownButton'
import { Button } from '@/components/elements/Button'
import React, { useState } from 'react'
import EditRundownDialog from './EditRundownDialog'
import DeleteAllRundownDialog from './DeleteAllRundownDialog'
import toast from 'react-hot-toast'

interface RundownTableProps {
  eventId: string
}

export const RundownTable = ({ eventId }: RundownTableProps) => {
  const { data: eventRundown = [] } = useGetEventRundownQuery(eventId)
  const [deleteRundown] = useDeleteRundownMutation()
  const [deleteAllRundown] = useDeleteAllRundownMutation()
  const [openPrompt, setOpenPrompt] = useState(false)
  const [openDeleteAllPrompt, setOpenDeleteAllPrompt] = useState(false)

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

  const handleDelete = async (rundownId: string) => {
    try {
      await deleteRundown({ id: rundownId }).unwrap()
    } catch (error) {
      toast.error('Failed to delete the rundown')
    }
  }

  const handleDeleteAll = async (eventId: string) => {
    handleCloseDeleteAllPopup()
    try {
      await deleteAllRundown({ eventId: eventId }).unwrap()
    } catch (error) {
      toast.error('Failed to delete all task steps')
    }
  }

  const handleOpenDeleteAllPopup = () => {
    setOpenDeleteAllPrompt(true)
  }

  const handleCloseDeleteAllPopup = () => {
    setOpenDeleteAllPrompt(false)
  }

  return (
    <div className="overflow-x-auto mt-2 mb-4">
      {eventRundown.length == 0 ? (
        <CreateRundownButton data-testid="create-rundown-button" />
      ) : (
        <div className="flex-row space-y-4">
          <Button
            variant="danger"
            data-testid={`rundown-${eventId}-delete-all`}
            onClick={() => {
              handleOpenDeleteAllPopup()
            }}
          >
            Delete All
          </Button>
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
                  <td className="border px-4 py-2 flex space-x-4">
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
                    <Button
                      variant="danger"
                      data-testid={`rundown-${rundown.id}-delete`}
                      onClick={() => {
                        handleDelete(rundown.id)
                      }}
                    >
                      Delete
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
          <DeleteAllRundownDialog
            open={openDeleteAllPrompt}
            onClose={handleCloseDeleteAllPopup}
            onConfirm={() => handleDeleteAll(eventId)}
          />
        </div>
      )}
    </div>
  )
}

export default RundownTable
