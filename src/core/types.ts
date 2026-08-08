export type Bindings = {
  pastes: KVNamespace
  key: string
}

export type GetRequest = {
  content: string
  key?: string
  url?: string
}

export type DeleteRequest = {
  key: string
}

export type UpdateRequest = {
  content: string
  key: string
}
