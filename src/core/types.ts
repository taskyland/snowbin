export type Bindings = {
  DB: D1Database
  key: string
}

export type GetRequest = {
  content: string
  key?: string
  url?: string
}
