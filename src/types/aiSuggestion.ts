export type AISuggestionFormType = {
  event_id: number
  prompt: string
}

export type AISuggestionResponse = {
  msg: string
}

export type AISugesstionHistory = {
  id: string
  date: string
  prompt: string
  output: string
}
