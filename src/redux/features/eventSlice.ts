import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IEvent {
  name: string
  budget: number
  date: string
  objective: string
  attendees: number
  theme: string
  services: string[]
}

const initialState: IEvent = {
  name: '',
  budget: 0,
  date: '',
  objective: '',
  attendees: 0,
  theme: '',
  services: [],
}

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setEventName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    setEventDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload
    },
    setEventBudget: (state, action: PayloadAction<number>) => {
      state.budget = action.payload
    },
    setEventPurpose: (
      state,
      action: PayloadAction<{
        objective: string
        attendees: number
        theme: string
      }>
    ) => {
      state.objective = action.payload.objective
      state.attendees = action.payload.attendees
      state.theme = action.payload.theme
    },
    resetEvent: (state) => {
      state = initialState
    },
  },
})

export const {
  setEventName,
  setEventDate,
  setEventBudget,
  setEventPurpose,
  resetEvent,
} = eventSlice.actions

export default eventSlice.reducer
