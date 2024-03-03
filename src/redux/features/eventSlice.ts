import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IEvent {
  id: string
  name: string
  budget: number
  date: Date
  objective: string
  attendees: number
  theme: string
  services: string[]
}

const initialState: IEvent = {
  id: '',
  name: '',
  budget: 0,
  date: new Date(),
  objective: '',
  attendees: 0,
  theme: '',
  services: [],
}

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setEvent: (state, action: PayloadAction<IEvent>) => {
      state = {
        ...state,
        ...action.payload,
      }
    },
    resetEvent: (state) => {
      state = initialState
    },
  },
})

export const { setEvent, resetEvent } = eventSlice.actions
export default eventSlice.reducer
