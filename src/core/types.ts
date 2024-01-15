export type Bindings = {
  pastes: KVNamespace
  key: string
}

export type GetRequest = {
  content: string
  key?: string
  url?: string
}
