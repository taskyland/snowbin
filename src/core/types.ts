export type Bindings = {
  pastes: D1Namespace
  key: string
}

export type GetRequest = {
  content: string
  key?: string
  url?: string
}
