export const useStringDate = (date: string) => {
    return new Date(date).toDateString()
}