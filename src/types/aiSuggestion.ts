export type AISuggestionFormType = {
  prompt: string
  event: {
    name: string
    theme: string
  }
  type: string
}

export type AISuggestionResponse = {
  output: string
  list: string[]
  keyword: []
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
