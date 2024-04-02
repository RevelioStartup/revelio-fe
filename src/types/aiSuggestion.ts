export type AISuggestionFormType = {
  prompt: string
  event?: {
    name: string
    theme: string
  }
  event_id: string
  type: string
}

export type AISuggestionResponse = {
  output: string
  list: string[]
  keyword: string[]
}

export type AISugesstionHistory = {
  id: string
  date: string
  prompt: string
  output: string
  list: string[]
  keyword: string[]
  type: string
}
