import dayjs from 'dayjs'
import type { ClassValue } from 'clsx'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...classLists: ClassValue[]) => twMerge(clsx(classLists))

export function lowerCasify(text: string): string {
  return text.replace(
    /([^\W_]+[^\s-]*) */g,
    (txt) => txt.charAt(0).toLowerCase() + txt.substr(1).toLowerCase()
  )
}

type Maybe<T> = T | null | undefined

export type Expiration =
  | 'never'
  | 'year'
  | 'month'
  | 'week'
  | 'day'
  | 'hour'
  | '10m'

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
