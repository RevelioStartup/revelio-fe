import dayjs from 'dayjs'

export const formatDateTime = (
  dateString: string | null,
  format: string = 'ddd, D MMM YY HH:mm'
) => {
  return dayjs(dateString).format(format)
}
