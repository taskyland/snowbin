import dayjs from 'dayjs'

type Maybe<T> = T | null | undefined

type Expiration = 'year' | 'month' | 'week' | 'day' | 'hour' | '10m'

export function getExpirationDate(input?: Maybe<Expiration>): Maybe<Date> {
  switch (input) {
    case 'year':
      return dayjs().add(1, 'year').toDate()
    case 'month':
      return dayjs().add(1, 'month').toDate()
    case 'week':
      return dayjs().add(1, 'week').toDate()
    case 'day':
      return dayjs().add(1, 'day').toDate()
    case 'hour':
      return dayjs().add(1, 'hour').toDate()
    case '10m':
      return dayjs().add(10, 'minute').toDate()
    default:
      return null
  }
}
